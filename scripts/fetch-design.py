"""
Usage: python scripts/fetch-design.py <design-url> [output-dir]
Downloads a Claude Design tarball and extracts it to output-dir (default: design-extracted/).
"""
import sys, os, tarfile, urllib.request, tempfile

def fetch_and_extract(url: str, out_dir: str = "design-extracted"):
    print(f"Fetching {url} ...")
    tmp = tempfile.mktemp(suffix=".tar.gz")
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req) as resp:
        print(f"  Status: {resp.status}  Content-Type: {resp.headers.get('Content-Type')}")
        data = resp.read()
    print(f"  Downloaded {len(data):,} bytes")
    with open(tmp, "wb") as f:
        f.write(data)

    os.makedirs(out_dir, exist_ok=True)
    with tarfile.open(tmp, "r:gz") as tar:
        tar.extractall(out_dir)
        names = tar.getnames()
    os.unlink(tmp)
    print(f"  Extracted {len(names)} files → {out_dir}/")
    for n in sorted(names):
        print(f"    {n}")
    return out_dir, names

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    url = sys.argv[1]
    out = sys.argv[2] if len(sys.argv) > 2 else "design-extracted"
    fetch_and_extract(url, out)
