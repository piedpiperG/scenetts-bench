from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parents[1]
INDEX_HTML = ROOT / "site" / "index.html"
ASSETS_DIR = ROOT / "site" / "assets"
DATA_DIR = ROOT / "site" / "data"


class SiteSmokeTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.html = INDEX_HTML.read_text(encoding="utf-8")

    def test_resource_links_use_real_destinations(self):
        self.assertIn(
            'href="https://github.com/piedpiperG/SceneTTS-Bench-Eval"',
            self.html,
        )
        self.assertIn(
            'href="https://huggingface.co/datasets/isabeth/SceneTTS-Bench"',
            self.html,
        )

    def test_page_includes_about_and_figures_sections(self):
        self.assertIn("About This Work", self.html)
        self.assertIn("Figures", self.html)

    def test_page_references_three_paper_figures(self):
        for image_name in (
            "main_pic_final.png",
            "exp_data.png",
            "radar_chart_v2.png",
        ):
            self.assertIn(f'./assets/{image_name}', self.html)
            self.assertTrue((ASSETS_DIR / image_name).exists(), image_name)

    def test_page_includes_curated_cases_section_and_data(self):
        self.assertIn("Curated Cases", self.html)
        self.assertIn('data-task="task1"', self.html)
        self.assertIn('data-task="task2"', self.html)
        self.assertIn('data-task="task3"', self.html)
        for file_name in (
            "task1_cases.json",
            "task2_cases.json",
            "task4_cases.json",
        ):
            self.assertTrue((DATA_DIR / file_name).exists(), file_name)


if __name__ == "__main__":
    unittest.main()
