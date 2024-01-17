import os
import re, json
import yaml
from datetime import datetime

def extract_yaml_from_md(md_file):
    with open(md_file, 'r', encoding='utf-8') as file:
        content = file.read()

    pattern = r'^---\n(.*?)\n---\n'
    match = re.match(pattern, content, re.DOTALL)

    if match:
        yaml_info = match.group(1)
        return yaml_info.strip()
    else:
        return None

def extract_fields_from_yaml(yaml_info):
    data = yaml.safe_load(yaml_info)
    permalink = data.get('permalink', '')
    date = data.get('date', '')
    name = data.get('name', '')
    return permalink, date, name

def sort_docs_by_date(docs):
    sorted_docs = sorted(docs, key=lambda x: datetime.strptime(x['date'], '%Y-%m-%d'), reverse=True)
    return sorted_docs

def write_docs_to_file(docs, file_path):
    with open(file_path, 'w') as file:
        for doc in docs:
            file.write(f"{doc['permalink']}\n")

def search_markdown_files(directory):
    markdown_files = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.md'):
                markdown_files.append(os.path.join(root, file))
    return markdown_files

# 搜索当前目录及其子目录中的所有 Markdown 文件
current_directory = os.getcwd()  # 获取当前目录
markdown_files = search_markdown_files(current_directory)

docs = []

for file in markdown_files:
    yaml_info = extract_yaml_from_md(file)

    if yaml_info:
        permalink, date, name = extract_fields_from_yaml(yaml_info)
        docs.append({'permalink': permalink, 'date': str(date), 'name': name})

output_file_path = 'docnames.txt'
sorted_docs = sort_docs_by_date(docs)
write_docs_to_file(sorted_docs, output_file_path)
print(f"已将排序后的文档名写入文件 {output_file_path}。")
doc_json = {}
for doc in docs:
    print(doc)
    year = doc.get("date", "1990")[:4]
    year_json = doc_json.get(year, [])
    year_json.append(doc)
    doc_json[year] = year_json

for y in doc_json:
    print(y)
    print(doc_json[y])
doc_json = json.dumps(doc_json)
with open(output_file_path, 'w', encoding='utf-8') as file:
    file.write(doc_json)
