from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parents[1]
INDEX_HTML = ROOT / "site" / "index.html"
ASSETS_DIR = ROOT / "site" / "assets"
MAIN_JS = ROOT / "site" / "assets" / "main.js"
STYLESHEET = ROOT / "site" / "assets" / "styles.css"


class SiteSmokeTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.html = INDEX_HTML.read_text(encoding="utf-8")
        cls.js = MAIN_JS.read_text(encoding="utf-8")
        cls.css = STYLESHEET.read_text(encoding="utf-8")

    def test_resource_links_use_real_destinations(self):
        self.assertIn(
            'href="https://github.com/piedpiperG/SceneTTS-Bench-Eval"',
            self.html,
        )
        self.assertIn(
            'href="https://huggingface.co/datasets/isabeth/SceneTTS-Bench"',
            self.html,
        )

    def test_page_uses_paper_sections(self):
        self.assertIn(">Abstract<", self.html)
        self.assertIn(">Keywords<", self.html)
        self.assertIn(">Failure Cases<", self.html)
        self.assertIn("Coming Soon", self.html)

    def test_page_references_three_paper_figures(self):
        for image_name in (
            "main_pic_final.png",
            "exp_data.png",
            "radar_chart_v2.png",
        ):
            self.assertIn(f'./assets/{image_name}', self.html)
            self.assertTrue((ASSETS_DIR / image_name).exists(), image_name)

    def test_page_uses_simple_footer_script(self):
        self.assertNotIn("loadCuratedCases", self.js)
        self.assertNotIn("cases-root", self.html)
        self.assertIn("footer-year", self.js)

    def test_page_drops_decorative_web_font_setup(self):
        self.assertNotIn("fonts.googleapis.com", self.html)
        self.assertNotIn("Instrument Serif", self.css)
        self.assertNotIn("Space Grotesk", self.css)


if __name__ == "__main__":
    unittest.main()
