import os
import json
import io
import re
import shutil
from dicttoxml import dicttoxml
from xml.dom.minidom import parseString
from ruamel.yaml import YAML
import xmltodict

# --- إعدادات أساسية ---
BASE_NAME = 'Core-Manifest'
# ملفات البيانات المصدرية المحتملة
SOURCE_FILES = [f"{BASE_NAME}.md", f"{BASE_NAME}.yaml", f"{BASE_NAME}.json", f"{BASE_NAME}.xml"]
# **تم التصحيح:** المسارات المستهدفة لملفات الجافاسكريبت التي سيتم تحديثها
JS_TARGET_FILES = [
    os.path.join('assets', 'js', 'dashboard_script.js'),
    os.path.join('assets', 'js', 'infographic_script.js')
]
# مجلد المخرجات لملفات البيانات المحولة
OUTPUT_DIR = 'output'


# --- دوال القراءة (Parsers) ---
def parse_md(filepath):
    """Parses YAML frontmatter from a Markdown file."""
    print(f"📖 Reading Markdown file: {filepath}")
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    if content.startswith('---'):
        parts = content.split('---')
        if len(parts) >= 3:
            yaml_parser = YAML(typ='safe')
            return yaml_parser.load(parts[1])
    raise ValueError("No valid YAML frontmatter found.")

def parse_yaml(filepath):
    """Parses a YAML file."""
    print(f"📄 Reading YAML file: {filepath}")
    yaml_parser = YAML(typ='safe')
    with open(filepath, 'r', encoding='utf-8') as f:
        documents = list(yaml_parser.load_all(f))
        if documents:
            return documents[0]
    raise ValueError("YAML file is empty or invalid.")

def parse_json(filepath):
    """Parses a JSON file."""
    print(f"📑 Reading JSON file: {filepath}")
    with open(filepath, 'r', encoding='utf-8') as f:
        return json.load(f)

def parse_xml(filepath):
    """Parses an XML file."""
    print(f"⚙️  Reading XML file: {filepath}")
    with open(filepath, 'r', encoding='utf-8') as f:
        data = xmltodict.parse(f.read())
        return data.get('root', data)


# --- دوال الكتابة (Writers) لتصدير البيانات ---
def write_yaml(data, filepath):
    """Writes data to a YAML file."""
    print(f"   ✍️  Writing to {filepath}...")
    yaml = YAML(); yaml.indent(mapping=2, sequence=4, offset=2)
    with open(filepath, 'w', encoding='utf-8') as f:
        yaml.dump(data, f)

def write_json(data, filepath):
    """Writes data to a pretty-printed JSON file."""
    print(f"   ✍️  Writing to {filepath}...")
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def write_xml(data, filepath):
    """Writes data to a pretty-printed XML file."""
    print(f"   ✍️  Writing to {filepath}...")
    xml_data = dicttoxml(data, custom_root='root', attr_type=False)
    dom = parseString(xml_data)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(dom.toprettyxml())
        
def write_md(data, filepath):
    """Writes data to a Markdown file with YAML frontmatter."""
    print(f"   ✍️  Writing to {filepath}...")
    yaml = YAML(); yaml.indent(mapping=2, sequence=4, offset=2)
    string_stream = io.StringIO(); yaml.dump(data, string_stream)
    yaml_frontmatter = string_stream.getvalue()
    md_body = f"# {data.get('projectTitle', 'Project Info')}\n\nThis file contains machine-readable metadata in its YAML frontmatter."
    full_content = f"---\n{yaml_frontmatter}---\n\n{md_body}"
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(full_content)


# --- **تم التصحيح:** الدالة الأساسية لتحديث بيانات ملفات JS الخارجية ---
def update_external_js_data(data):
    """
    Finds and replaces the 'projectData' object directly within the target JavaScript files.
    """
    print("\n🎨 Updating external JavaScript data files...")
    if not data:
        print("   ❌ No data provided to update. Skipping.")
        return

    # تحويل قاموس بايثون إلى نص JSON منسق
    data_as_json_str = json.dumps(data, indent=4, ensure_ascii=False)
    # بناء كتلة الجافاسكريبت الكاملة التي ستحل محل القديمة
    js_replacement_block = (
        f"// --- DATA STORE ---\n// This object is updated automatically by the converter script.\n"
        f"const projectData = {data_as_json_str};"
    )
    
    updated_count = 0
    for js_path in JS_TARGET_FILES:
        if not os.path.exists(js_path):
            print(f"   ⚠️  Warning: JS file not found at '{js_path}'. Skipping.")
            continue
        try:
            with open(js_path, 'r', encoding='utf-8') as f:
                original_content = f.read()
            
            # تعبير نمطي للبحث عن كتلة البيانات بأكملها في ملف JS
            pattern = re.compile(r'// --- DATA STORE ---\s*.*?const projectData\s*=\s*\{.*?\};', re.DOTALL)
            
            if pattern.search(original_content):
                # استبدال الكتلة القديمة بالجديدة
                updated_content = pattern.sub(js_replacement_block, original_content, count=1)
                with open(js_path, 'w', encoding='utf-8') as f:
                    f.write(updated_content)
                print(f"   ✔️  Successfully updated data in: {js_path}")
                updated_count += 1
            else:
                print(f"   ❓ Could not find 'const projectData' block in {js_path}. Skipping.")
        except Exception as e:
            print(f"   ‼️ An error occurred while updating {js_path}: {e}")

    if updated_count > 0:
        print("✨ JavaScript data update completed.")


# --- الدالة الرئيسية لتشغيل العمليات ---
def main():
    """Main execution function."""
    source_file, source_format = None, None
    for filename in SOURCE_FILES:
        if os.path.exists(filename):
            source_file, source_format = filename, filename.split('.')[-1]
            break

    if not source_file:
        print(f"❌ No source file found in the current directory (e.g., {BASE_NAME}.json). Aborting.")
        return

    print(f"✅ Source file detected: {source_file}")
    
    # 1. قراءة البيانات من المصدر
    try:
        parser = {'md': parse_md, 'yaml': parse_yaml, 'json': parse_json, 'xml': parse_xml}
        data_dict = parser[source_format](source_file)
    except Exception as e:
        print(f"‼️ Error reading source file: {e}")
        return

    # 2. **تم التصحيح:** تحديث البيانات في ملفات JS الخارجية
    update_external_js_data(data_dict)

    # 3. تجهيز مجلد المخرجات وتصدير تنسيقات البيانات
    print(f"\n🔄 Exporting data formats to '{OUTPUT_DIR}' directory...")
    if os.path.exists(OUTPUT_DIR):
        shutil.rmtree(OUTPUT_DIR)
    os.makedirs(OUTPUT_DIR)

    writers = {
        'yaml': lambda: write_yaml(data_dict, os.path.join(OUTPUT_DIR, f"{BASE_NAME}.yaml")),
        'json': lambda: write_json(data_dict, os.path.join(OUTPUT_DIR, f"{BASE_NAME}.json")),
        'xml': lambda: write_xml(data_dict, os.path.join(OUTPUT_DIR, f"{BASE_NAME}.xml")),
        'md': lambda: write_md(data_dict, os.path.join(OUTPUT_DIR, f"{BASE_NAME}.md"))
    }

    # لا تقم بإنشاء نسخة من الملف المصدري بنفس التنسيق
    if source_format in writers:
        del writers[source_format]
        
    for writer_func in writers.values():
        writer_func()
    
    # نسخ الملف المصدري إلى مجلد المخرجات للاكتمال
    shutil.copy(source_file, os.path.join(OUTPUT_DIR, os.path.basename(source_file)))
    print(f"   ➔ Source file '{source_file}' also copied to '{OUTPUT_DIR}'.")
    
    print(f"\n🎉 All tasks completed successfully! JS files updated and data exported to '{OUTPUT_DIR}'.")

if __name__ == "__main__":
    main()
