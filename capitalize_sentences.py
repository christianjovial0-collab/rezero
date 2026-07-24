import re
from html.parser import HTMLParser
from pathlib import Path

class SentenceCapitalizer(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=False)
        self.result = []

    def handle_starttag(self, tag, attrs):
        attrs_text = "".join(f' {name}="{value}"' if value is not None else f' {name}' for name, value in attrs)
        self.result.append(f"<{tag}{attrs_text}>")

    def handle_endtag(self, tag):
        self.result.append(f"</{tag}>")

    def handle_startendtag(self, tag, attrs):
        attrs_text = "".join(f' {name}="{value}"' if value is not None else f' {name}' for name, value in attrs)
        self.result.append(f"<{tag}{attrs_text} />")

    def handle_data(self, data):
        self.result.append(self.capitalized_data(data))

    def handle_entityref(self, name):
        self.result.append(f"&{name};")

    def handle_charref(self, name):
        self.result.append(f"&#{name};")

    def handle_comment(self, data):
        self.result.append(f"<!--{data}-->")

    @staticmethod
    def capitalized_data(text):
        if not text.strip():
            return text

        parts = re.split(r'([.!?…]["’”\']*\s+)', text)
        if not parts:
            return text

        new_parts = []
        capitalize_next = True
        for part in parts:
            if re.match(r'^[.!?…]', part):
                new_parts.append(part)
                capitalize_next = True
                continue

            if capitalize_next:
                new_parts.append(re.sub(
                    r'^(\s*)([a-zàâäçéèêëîïôöùûüÿœæ])',
                    lambda m: m.group(1) + m.group(2).upper(),
                    part,
                    count=1,
                ))
            else:
                new_parts.append(part)
            capitalize_next = False

        return ''.join(new_parts)


def capitalize_file(path: Path) -> None:
    html = path.read_text(encoding='utf-8')
    parser = SentenceCapitalizer()
    parser.feed(html)
    output = ''.join(parser.result)
    path.write_text(output, encoding='utf-8')


if __name__ == '__main__':
    import sys
    if len(sys.argv) < 2:
        print('Usage: python capitalize_sentences.py <file1> [<file2> ...]')
        raise SystemExit(1)
    for filename in sys.argv[1:]:
        capitalize_file(Path(filename))
        print(f'Processed {filename}')
