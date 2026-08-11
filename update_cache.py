"""使用爬取到的完整数据更新 problem_cache.js"""
import json

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FETCHED_PATH = f'{BASE_DIR}/luogu_fetched.json'
CACHE_PATH = f'{BASE_DIR}/js/problem_cache.js'

with open(FETCHED_PATH, 'r', encoding='utf-8') as f:
    fetched = json.load(f)

print(f'Loaded {len(fetched)} fetched problems')

def escape_js_str(s):
    if not s:
        return ''
    return s.replace('\\', '\\\\').replace("'", "\\'").replace('\n', '\\n').replace('\r', '\\r')

lines = ['// 洛谷题目本地缓存（从洛谷实时爬取）\n', 'window.PROBLEM_CACHE = {\n']
count = 0

for pid, data in fetched.items():
    if data.get('_error'):
        continue
    
    title = escape_js_str(data.get('title', pid))
    diff = data.get('difficulty', 3)
    description = escape_js_str(data.get('description', ''))
    constraints = escape_js_str(data.get('constraints', ''))
    samples = data.get('samples', [])
    
    lines.append(f"  '{pid}': {{\n")
    lines.append(f"    id: '{pid}',\n")
    lines.append(f"    title: '{title}',\n")
    lines.append(f"    difficulty: {diff},\n")
    lines.append(f"    description: '{description}',\n")
    
    # 样例
    if samples:
        lines.append(f"    samples: [\n")
        for s in samples:
            si = escape_js_str(s.get('input', ''))
            so = escape_js_str(s.get('output', ''))
            lines.append(f"      {{ input: '{si}', output: '{so}' }},\n")
        lines.append(f"    ],\n")
    else:
        lines.append(f"    samples: [],\n")
    
    lines.append(f"    constraints: '{constraints}',\n")
    lines.append(f"  }},\n")
    count += 1

lines[-1] = lines[-1].rstrip(',\n') + '\n'
lines.append('};\n')

with open(CACHE_PATH, 'w', encoding='utf-8') as f:
    f.writelines(lines)

print(f'Updated problem_cache.js with {count} problems')

# 验证文件大小
import os
size_mb = os.path.getsize(CACHE_PATH) / (1024 * 1024)
print(f'File size: {size_mb:.1f} MB')
