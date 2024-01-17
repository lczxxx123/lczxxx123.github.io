touch tdocnames.txt
touch docnames.txt
ls -lh
find . -type f -name "*.md" > tdocnames.txt
cat tdocnames.txt
input_file="tdocnames.txt"
output_file="docnames.txt"
> "$output_file"
while IFS= read -r line; do
  echo "---process---: $line"
  if head -n 10 "$line" | grep -q '^---'; then
    regline=$(grep -m 1 '^name: ' "$line")
    if [[ -n "$regline" ]]; then
      filename="${regline#*: }"
      echo "yaml name: $filename"
    else
      filename=$(basename "$line")
      echo "failed find yaml, use name: $filename"
    fi
    echo $line
    regline=`head -n 10 $line | sed -n 's/^permalink:.*$/\0/p'| sed 's/\r//g'`
    echo $regline
    if [[ -n "$regline" ]]; then
      line="${regline#*: }"
      echo "$line"
      echo ",,,,,,,line,,,,,,,$line,,,,33333333333333333,,,"
    fi
  else
    filename=$(basename "$line")
    echo "未找到配置信息，返回文件名: $filename"
  fi

#   echo "line,,$line,,"
#   echo "filename,,$filename,,"
#   echo ",,$line,,$filename,,"
  new_line="$line,$filename"
  echo "$new_line" >> "$output_file"
done < "$input_file"
cat docnames.txt