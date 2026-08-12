"""
OI练习助手 - 构建脚本
生成三个版本：网页版(.html)、Windows版(.exe)、Linux版(.deb)
"""
import os
import json
import shutil
import subprocess
import sys
from pathlib import Path

BASE_DIR = Path(__file__).parent
BUILD_DIR = BASE_DIR / 'build'
CSS_DIR = BASE_DIR / 'css'
JS_DIR = BASE_DIR / 'js'
ASSETS_DIR = BASE_DIR / 'assets'

def read_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

def minify_css(css):
    """简单的CSS压缩"""
    import re
    css = re.sub(r'/\*[\s\S]*?\*/', '', css)
    css = re.sub(r'\s+', ' ', css)
    css = re.sub(r';\s*', ';', css)
    css = re.sub(r'\{\s*', '{', css)
    css = re.sub(r'\}\s*', '}', css)
    return css.strip()

def read_all_css():
    """读取所有CSS文件"""
    css_files = ['style.css', 'map.css', 'lesson.css', 'ai-chat.css']
    all_css = ""
    for f in css_files:
        path = CSS_DIR / f
        if path.exists():
            all_css += f"/* {f} */\n" + read_file(path) + "\n"
    return all_css

def read_all_js():
    """读取所有JS文件"""
    js_files = [
        'problem_cache.js', 'data.js', 'content.js',
        'missing_part6.js', 'missing_part7.js', 'missing_part8_10.js',
        'storage.js', 'ai.js', 'luogu.js', 'map.js', 'lesson.js', 'app.js'
    ]
    all_js = ""
    for f in js_files:
        path = JS_DIR / f
        if path.exists():
            all_js += f"// == {f} ==\n" + read_file(path) + "\n\n"
        else:
            print(f"  WARNING: {f} not found, skipping...")
    return all_js

def build_html():
    """构建单文件HTML版本"""
    print("\n[1/3] 构建网页版 (OI练习助手.html)...")
    
    html_template = read_file(BASE_DIR / 'index.html')
    
    # 内联CSS
    all_css = read_all_css()
    css_paths = ['css/style.css', 'css/map.css', 'css/lesson.css', 'css/ai-chat.css']
    for css_path in css_paths:
        html_template = html_template.replace(
            f'<link rel="stylesheet" href="{css_path}">',
            ''
        )
    # 插入内联CSS
    html_template = html_template.replace('</head>', f'<style>\n{minify_css(all_css)}\n</style>\n</head>')
    
    # 移除CDN的CSS（highlight.js已在style中）
    html_template = html_template.replace(
        '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css">',
        ''
    )
    
    # 内联JS
    all_js = read_all_js()
    js_paths = [
        'js/problem_cache.js', 'js/data.js', 'js/content.js',
        'js/missing_part6.js', 'js/missing_part7.js', 'js/missing_part8_10.js',
        'js/storage.js', 'js/ai.js', 'js/luogu.js', 'js/map.js', 'js/lesson.js', 'js/app.js'
    ]
    for js_path in js_paths:
        html_template = html_template.replace(f'<script src="{js_path}"></script>', '')
    
    # 保留CDN的marked和highlight.js
    # 插入内联JS
    html_template = html_template.replace('</body>', f'<script>\n{all_js}\n</script>\n</body>')
    
    # 保存
    output_path = BUILD_DIR
    output_path.mkdir(exist_ok=True)
    html_output = output_path / 'OI练习助手.html'
    with open(html_output, 'w', encoding='utf-8') as f:
        f.write(html_template)
    
    size_kb = os.path.getsize(html_output) / 1024
    print(f"  ✓ 网页版已生成: {html_output}")
    print(f"    文件大小: {size_kb:.1f} KB")

def build_windows_exe():
    """构建Windows .exe版本"""
    print("\n[2/3] 构建Windows版 (OI练习助手.exe)...")
    
    # 创建webview启动器
    launcher_code = '''"""
OI练习助手 - Windows桌面版
使用系统WebView显示应用
"""
import http.server
import socketserver
import threading
import webbrowser
import os
import sys
import time

def get_app_dir():
    if getattr(sys, 'frozen', False):
        return os.path.dirname(sys.executable)
    return os.path.dirname(os.path.abspath(__file__))

class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        pass

def start_server(port, directory):
    os.chdir(directory)
    handler = QuietHandler
    with socketserver.TCPServer(("", port), handler) as httpd:
        httpd.serve_forever()

def main():
    app_dir = get_app_dir()
    port = 18923
    
    # 启动本地HTTP服务器
    server_thread = threading.Thread(
        target=start_server, args=(port, app_dir), daemon=True
    )
    server_thread.start()
    time.sleep(0.5)
    
    # 打开浏览器
    url = f"http://localhost:{port}/OI练习助手.html"
    webbrowser.open(url)
    
    print(f"OI练习助手已启动！请在浏览器中查看: {url}")
    print("关闭此窗口将退出应用。")
    
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        pass

if __name__ == '__main__':
    main()
'''
    
    # 复制HTML到构建目录
    html_src = BUILD_DIR / 'OI练习助手.html'
    if not html_src.exists():
        build_html()
    
    # 保存启动器
    launcher_path = BUILD_DIR / 'oi_launcher.py'
    with open(launcher_path, 'w', encoding='utf-8') as f:
        f.write(launcher_code)
    
    # 尝试使用PyInstaller打包
    try:
        import PyInstaller
        print("  正在使用PyInstaller打包...")
        
        # 构建spec
        spec_content = f'''# -*- mode: python ; coding: utf-8 -*-
a = Analysis(
    ['{launcher_path}'],
    pathex=[],
    binaries=[],
    datas=[('{html_src}', '.')],
    hiddenimports=[],
    hookspath=[],
    runtime_hooks=[],
    excludes=[],
    noarchive=False,
)
pyz = PYZ(a.pure)
exe = EXE(
    pyz,
    a.scripts,
    a.binaries,
    a.datas,
    [],
    name='OI练习助手',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    console=True,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
    icon=None,
)
'''
        spec_path = BUILD_DIR / 'oi_launcher.spec'
        with open(spec_path, 'w', encoding='utf-8') as f:
            f.write(spec_content)
        
        result = subprocess.run(
            ['pyinstaller', '--onefile', '--name', 'OI练习助手',
             '--add-data', f'{html_src};.',
             '--distpath', str(BUILD_DIR),
             '--workpath', str(BUILD_DIR / 'pyinstaller_build'),
             '--specpath', str(BUILD_DIR),
             str(launcher_path)],
            cwd=str(BUILD_DIR),
            capture_output=True, text=True, timeout=300
        )
        
        if result.returncode == 0:
            exe_path = BUILD_DIR / 'OI练习助手.exe'
            if exe_path.exists():
                size_mb = os.path.getsize(exe_path) / (1024*1024)
                print(f"  ✓ Windows版已生成: {exe_path}")
                print(f"    文件大小: {size_mb:.1f} MB")
            else:
                print(f"  ⚠ PyInstaller完成但未找到exe文件")
        else:
            print(f"  ⚠ PyInstaller打包失败: {result.stderr[:200]}")
            print(f"  备选方案: 请手动安装 PyInstaller (pip install pyinstaller) 后重试")
    
    except ImportError:
        print("  ⚠ 未安装PyInstaller，跳过exe打包")
        print(f"  备选方案1: pip install pyinstaller 后重新运行此脚本")
        print(f"  备选方案2: 直接使用 OI练习助手.html 在浏览器中打开")
        print(f"  备选方案3: 使用 HTML 转 EXE 工具如 NW.js 或 Electron 打包")
    
    except Exception as e:
        print(f"  ⚠ 打包exe时出错: {e}")
        print(f"  备选方案: 直接使用 OI练习助手.html 在浏览器中打开")

def build_linux_deb():
    """构建Linux .deb版本"""
    print("\n[3/3] 构建Linux版 (OI练习助手.deb)...")
    
    if sys.platform != 'linux':
        print("  ⚠ 当前不是Linux系统，将创建.deb包结构（可在Linux上安装）")
    
    deb_dir = BUILD_DIR / 'deb_package'
    deb_dir.mkdir(exist_ok=True)
    
    # 创建.deb目录结构
    control_dir = deb_dir / 'DEBIAN'
    control_dir.mkdir(exist_ok=True)
    
    app_dir = deb_dir / 'usr' / 'share' / 'oi-practice-assistant'
    app_dir.mkdir(parents=True, exist_ok=True)
    
    bin_dir = deb_dir / 'usr' / 'bin'
    bin_dir.mkdir(parents=True, exist_ok=True)
    
    desktop_dir = deb_dir / 'usr' / 'share' / 'applications'
    desktop_dir.mkdir(parents=True, exist_ok=True)
    
    icon_dir = deb_dir / 'usr' / 'share' / 'icons' / 'hicolor' / '256x256' / 'apps'
    icon_dir.mkdir(parents=True, exist_ok=True)
    
    # 控制文件
    control_content = '''Package: oi-practice-assistant
Version: 1.0.0
Architecture: all
Maintainer: OI Exercise Assistant Team
Section: education
Priority: optional
Depends: python3, python3-tk
Description: OI Practice Assistant - Algorithm Learning Tool
 An interactive algorithm learning application designed for
 Chinese middle school students preparing for informatics
 competitions (OI). Features a Duolingo-like map UI with
 comprehensive algorithm tutorials, practice problems from
 Luogu, and an AI-powered learning assistant.
Homepage: https://github.com/oi-practice-assistant
'''
    with open(control_dir / 'control', 'w', encoding='utf-8') as f:
        f.write(control_content)
    
    # 复制HTML文件
    html_src = BUILD_DIR / 'OI练习助手.html'
    if not html_src.exists():
        build_html()
    
    shutil.copy(html_src, app_dir / 'OI练习助手.html')
    
    # 复制图标
    icon_png = ASSETS_DIR / 'icon.png'
    if icon_png.exists():
        shutil.copy(icon_png, icon_dir / 'oi-practice-assistant.png')
    
    # 创建启动脚本
    launcher = '''#!/bin/bash
# OI练习助手 Linux启动器
APP_DIR="/usr/share/oi-practice-assistant"
HTML_FILE="$APP_DIR/OI练习助手.html"

# 尝试用默认浏览器打开
if command -v xdg-open &> /dev/null; then
    xdg-open "$HTML_FILE"
elif command -v gnome-open &> /dev/null; then
    gnome-open "$HTML_FILE"
elif command -v sensible-browser &> /dev/null; then
    sensible-browser "$HTML_FILE"
else
    echo "请用浏览器打开: $HTML_FILE"
fi
'''
    launcher_path = bin_dir / 'oi-practice-assistant'
    with open(launcher_path, 'w', encoding='utf-8') as f:
        f.write(launcher)
    os.chmod(launcher_path, 0o755)
    
    # 创建.desktop文件
    desktop_content = '''[Desktop Entry]
Name=OI练习助手
Comment=算法学习之旅 - 交互式OI学习工具
Exec=oi-practice-assistant
Icon=oi-practice-assistant
Terminal=false
Type=Application
Categories=Education;Science;
Keywords=OI;algorithm;programming;education;
'''
    with open(desktop_dir / 'oi-practice-assistant.desktop', 'w', encoding='utf-8') as f:
        f.write(desktop_content)
    
    # 创建.deb包
    if sys.platform == 'linux':
        try:
            result = subprocess.run(
                ['dpkg-deb', '--build', str(deb_dir), str(BUILD_DIR / 'OI练习助手.deb')],
                capture_output=True, text=True, timeout=60
            )
            if result.returncode == 0:
                deb_path = BUILD_DIR / 'OI练习助手.deb'
                size_kb = os.path.getsize(deb_path) / 1024
                print(f"  ✓ Linux版已生成: {deb_path}")
                print(f"    文件大小: {size_kb:.1f} KB")
                print(f"    安装命令: sudo dpkg -i {deb_path}")
            else:
                print(f"  ⚠ dpkg-deb失败: {result.stderr[:200]}")
        except FileNotFoundError:
            print("  ⚠ 未找到dpkg-deb命令（需要Linux环境）")
            print(f"  📦 已创建.deb包结构: {deb_dir}")
            print(f"  在Linux上运行以下命令打包:")
            print(f"    dpkg-deb --build {deb_dir} OI练习助手.deb")
    else:
        # 在Windows上创建tar.gz作为替代
        import tarfile
        tar_path = BUILD_DIR / 'OI练习助手-linux.tar.gz'
        with tarfile.open(tar_path, 'w:gz') as tar:
            tar.add(deb_dir, arcname='OI练习助手-linux')
        size_kb = os.path.getsize(tar_path) / 1024
        print(f"  ✓ Linux版包已生成: {tar_path}")
        print(f"    文件大小: {size_kb:.1f} KB")
        print(f"  将此包复制到Linux系统后解压并安装:")
        print(f"    tar -xzf OI练习助手-linux.tar.gz")
        print(f"    或直接将 OI练习助手.html 复制到Linux用浏览器打开")

def main():
    print("=" * 60)
    print("  OI练习助手 - 构建工具")
    print("=" * 60)
    
    # 确保构建目录存在
    BUILD_DIR.mkdir(exist_ok=True)
    
    # 1. 构建网页版
    build_html()
    
    # 2. 构建Windows版
    build_windows_exe()
    
    # 3. 构建Linux版
    build_linux_deb()
    
    print("\n" + "=" * 60)
    print("  构建完成！")
    print(f"  所有文件输出到: {BUILD_DIR}")
    print("=" * 60)
    print("\n使用说明:")
    print("  网页版: 直接用浏览器打开 build/OI练习助手.html")
    print("  Windows版: 运行 build/OI练习助手.exe")
    print("  Linux版: 安装 build/OI练习助手.deb 或解压tar.gz")

if __name__ == '__main__':
    main()
