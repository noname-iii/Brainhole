import json, re
from collections import Counter

with open('js/data.js', 'r', encoding='utf-8') as f:
    content = f.read()
json_str = content.replace('const CHAPTERS =', '').strip().rstrip(';').strip()
json_str = json_str.replace("'", '"')
json_str = re.sub(r'([\{\,\[]\s*)([a-zA-Z_][a-zA-Z0-9_]*)\s*:', r'\1"\2":', json_str)
chapters = json.loads(json_str)

with open('js/problem_cache.js', 'r', encoding='utf-8') as f:
    cache_content = f.read()

difficulty_map = {}
pid = None
for line in cache_content.split('\n'):
    if 'id:' in line and 'P' in line:
        pid = line.split("'")[1]
    if 'difficulty:' in line:
        diff = int(line.split(':')[1].strip().replace(',', ''))
        if pid:
            difficulty_map[pid] = diff

def diff_label(d):
    labels = {0:'?', 1:'红', 2:'橙', 3:'黄', 4:'绿', 5:'青', 6:'蓝', 7:'紫'}
    return labels.get(d, str(d))

print("阶梯难度验证: 模板 | #2-3绿(4) | #4-7青(5) | #8-9蓝(6) | #10紫(7)")
print("=" * 100)

all_pids = []
ok_count = 0
warn_count = 0

for ch in chapters:
    ch_title = ch['title']
    problems = []
    for mod in ch['modules']:
        if mod['type'] == 'problem':
            problems.append(mod['luoguId'])
            all_pids.append(problems[-1])
    
    diffs = [difficulty_map.get(pid, 0) for pid in problems]
    
    if len(problems) == 0:
        print(f"  ✗ {ch_title}: 无题目!")
        warn_count += 1
        continue
    
    # 阶梯验证
    issues = []
    # #2-3: 目标4(绿)，接受≥4
    if len(diffs) >= 3:
        if any(d < 4 for d in diffs[1:3]):
            issues.append(f"绿带≥4: {[diff_label(d) for d in diffs[1:3]]}")
    elif len(diffs) >= 2:
        if diffs[1] < 4:
            issues.append(f"绿带≥4: {diff_label(diffs[1])}")
    # #4-7: 目标5(青)，接受≥5
    if len(diffs) >= 7:
        if any(d < 5 for d in diffs[3:7]):
            issues.append(f"青带≥5: {[diff_label(d) for d in diffs[3:7]]}")
    elif len(diffs) >= 4:
        for i, d in enumerate(diffs[3:], 4):
            if d < 5 and i <= 7:
                issues.append(f"#4-7青带≥5: #{i+1}={diff_label(d)}")
    # #8-9: 目标6(蓝)，接受≥6
    if len(diffs) >= 9:
        if any(d < 6 for d in diffs[7:9]):
            issues.append(f"蓝带≥6: {[diff_label(d) for d in diffs[7:9]]}")
    elif len(diffs) >= 8:
        for i, d in enumerate(diffs[7:], 8):
            if d < 6 and i <= 9:
                issues.append(f"#8-9蓝带≥6: #{i+1}={diff_label(d)}")
    # #10: 目标7(紫)，接受≥7
    if len(diffs) >= 10:
        if diffs[9] < 7:
            issues.append(f"紫带≥7: #{11}={diff_label(diffs[9])}")
    
    status = "✓" if not issues else "✗"
    if status == "✓":
        ok_count += 1
    else:
        warn_count += 1
    
    labels = ','.join(diff_label(d) for d in diffs)
    print(f"{status} {ch_title}: [{labels}]")
    for iss in issues:
        print(f"    ⚠ {iss}")

print("\n" + "=" * 100)
print(f"结果: {ok_count}章节通过, {warn_count}章节需关注")
print(f"总题目数: {len(all_pids)}, 唯一: {len(set(all_pids))}")

if len(all_pids) != len(set(all_pids)):
    print("✗ 重复!")
    counts = Counter(all_pids)
    print(f"重复: {[p for p,c in counts.items() if c>1]}")
else:
    print("✓ 无重复")
