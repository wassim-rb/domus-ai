from __future__ import annotations

from pathlib import Path
from typing import Iterable, Tuple

from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageOps


WIDTH = 4512
HEIGHT = 764
OUTPUT_DIR = Path(__file__).resolve().parent
FONT_DIR = Path("/Users/wassimrb/.codex/skills/canvas-design/assets/canvas-fonts")
LOGO_PATH = Path(__file__).resolve().parents[1] / "favicon.svg.png"


def font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(FONT_DIR / path), size=size)


SERIF_TITLE = font("InstrumentSerif-Regular.ttf", 164)
SERIF_ITALIC = font("InstrumentSerif-Italic.ttf", 126)
SANS_BOLD = font("InstrumentSans-Bold.ttf", 76)
SANS_REGULAR = font("InstrumentSans-Regular.ttf", 56)
SANS_SMALL = font("InstrumentSans-Regular.ttf", 40)
MONO = font("IBMPlexMono-Regular.ttf", 34)
MONO_SMALL = font("IBMPlexMono-Regular.ttf", 30)


def gradient_background(
    start: Tuple[int, int, int],
    end: Tuple[int, int, int],
    vertical: bool = False,
) -> Image.Image:
    bg = Image.new("RGB", (WIDTH, HEIGHT), start)
    draw = ImageDraw.Draw(bg)
    length = HEIGHT if vertical else WIDTH
    for i in range(length):
        t = i / max(1, length - 1)
        color = tuple(int(start[c] * (1 - t) + end[c] * t) for c in range(3))
        if vertical:
            draw.line((0, i, WIDTH, i), fill=color)
        else:
            draw.line((i, 0, i, HEIGHT), fill=color)
    return bg


def add_logo(base: Image.Image, x: int, y: int, size: int) -> None:
    logo = Image.open(LOGO_PATH).convert("RGBA").resize((size, size), Image.Resampling.LANCZOS)
    base.alpha_composite(logo, (x, y))


def add_noise(base: Image.Image, opacity: int = 18) -> None:
    noise = Image.effect_noise((WIDTH, HEIGHT), 9).convert("L")
    grain = ImageOps.colorize(noise, black=(0, 0, 0), white=(255, 255, 255)).convert("RGBA")
    grain.putalpha(opacity)
    base.alpha_composite(grain)


def draw_chip(draw: ImageDraw.ImageDraw, x: int, y: int, text: str) -> int:
    padding_x = 34
    padding_y = 18
    bbox = draw.textbbox((0, 0), text, font=MONO_SMALL)
    width = bbox[2] - bbox[0] + padding_x * 2
    height = bbox[3] - bbox[1] + padding_y * 2
    draw.rounded_rectangle(
        (x, y, x + width, y + height),
        radius=16,
        outline=(200, 146, 42, 180),
        width=2,
        fill=(17, 17, 16, 210),
    )
    draw.text((x + padding_x, y + padding_y - 2), text, font=MONO_SMALL, fill=(240, 234, 216, 245))
    return width


def polyline(draw: ImageDraw.ImageDraw, points: Iterable[Tuple[int, int]], fill, width: int) -> None:
    pts = list(points)
    for i in range(len(pts) - 1):
        draw.line((pts[i], pts[i + 1]), fill=fill, width=width)


def save_png(image: Image.Image, filename: str) -> None:
    image.convert("RGB").save(OUTPUT_DIR / filename, format="PNG", optimize=True)


def banner_01() -> None:
    base = gradient_background((7, 8, 8), (15, 13, 11)).convert("RGBA")
    draw = ImageDraw.Draw(base, "RGBA")

    # right warm glow
    glow = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow, "RGBA")
    gd.ellipse((WIDTH - 1450, -380, WIDTH + 380, HEIGHT + 340), fill=(200, 146, 42, 85))
    glow = glow.filter(ImageFilter.GaussianBlur(85))
    base.alpha_composite(glow)

    # framing
    draw.rectangle((118, 106, WIDTH - 118, HEIGHT - 106), outline=(200, 146, 42, 82), width=2)
    draw.line((168, 170, 168, HEIGHT - 170), fill=(200, 146, 42, 110), width=3)

    add_logo(base, x=238, y=198, size=270)

    draw.text((585, 192), "Domus", font=SERIF_TITLE, fill=(238, 232, 220, 245))
    draw.text((1165, 192), "AI", font=SERIF_TITLE, fill=(223, 176, 90, 255))
    draw.text(
        (590, 382),
        "L IA concrète pour les agences immobilières indépendantes",
        font=SANS_BOLD,
        fill=(240, 234, 216, 240),
    )
    draw.text(
        (590, 476),
        "Annonces en minutes  •  Réponses plus rapides  •  Équipe accompagnée",
        font=SANS_SMALL,
        fill=(170, 163, 150, 240),
    )

    # architectural linework
    polyline(
        draw,
        [
            (3050, 146),
            (3580, 146),
            (3980, 182),
            (4300, 300),
        ],
        fill=(200, 146, 42, 150),
        width=5,
    )
    polyline(
        draw,
        [
            (3000, 254),
            (3500, 280),
            (3900, 352),
            (4300, 520),
        ],
        fill=(129, 121, 106, 130),
        width=3,
    )

    add_noise(base, opacity=8)
    save_png(base, "proposition-01-patrimoine-signal.png")


def banner_02() -> None:
    base = gradient_background((9, 9, 8), (18, 15, 13)).convert("RGBA")
    draw = ImageDraw.Draw(base, "RGBA")

    # structured grid
    for x in range(180, WIDTH, 260):
        draw.line((x, 80, x, HEIGHT - 80), fill=(240, 234, 216, 18), width=1)
    for y in range(100, HEIGHT, 120):
        draw.line((120, y, WIDTH - 120, y), fill=(240, 234, 216, 16), width=1)

    # left panel
    draw.rounded_rectangle(
        (132, 90, 1500, HEIGHT - 90),
        radius=22,
        fill=(14, 14, 13, 228),
        outline=(200, 146, 42, 95),
        width=3,
    )
    add_logo(base, x=214, y=190, size=200)
    draw.text((450, 198), "Domus AI", font=SERIF_ITALIC, fill=(240, 234, 216, 245))
    draw.text((450, 338), "SYSTEME TERRAIN", font=MONO, fill=(223, 176, 90, 240))
    draw.text((214, 452), "IA utile, configurée pour les vrais dossiers.", font=SANS_REGULAR, fill=(240, 234, 216, 235))

    chip_x = 214
    chip_y = 560
    chip_x += draw_chip(draw, chip_x, chip_y, "3 min annonce") + 20
    chip_x += draw_chip(draw, chip_x, chip_y, "J+7 premiers gains") + 20
    draw_chip(draw, chip_x, chip_y, "2-15 collaborateurs")

    # right modular cards
    cards = [
        (1700, 148, 2520, 330, "01", "Qualification"),
        (2600, 148, 3420, 330, "02", "Automatisation"),
        (3500, 148, 4320, 330, "03", "Adoption équipe"),
        (1700, 386, 2960, 620, "A", "Rythme agence respecté"),
        (3040, 386, 4320, 620, "B", "Pilotage simple"),
    ]
    for x1, y1, x2, y2, idx, label in cards:
        draw.rounded_rectangle(
            (x1, y1, x2, y2),
            radius=18,
            fill=(19, 18, 16, 215),
            outline=(200, 146, 42, 92),
            width=2,
        )
        draw.text((x1 + 26, y1 + 26), idx, font=MONO, fill=(223, 176, 90, 255))
        draw.text((x1 + 26, y1 + 90), label, font=SANS_REGULAR, fill=(240, 234, 216, 235))

    add_noise(base, opacity=8)
    save_png(base, "proposition-02-cadastre-lumineux.png")


def banner_03() -> None:
    base = gradient_background((8, 8, 8), (16, 13, 11), vertical=True).convert("RGBA")
    draw = ImageDraw.Draw(base, "RGBA")

    # layered circles for editorial depth
    circles = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    cd = ImageDraw.Draw(circles, "RGBA")
    cd.ellipse((-420, -500, 1450, 1250), fill=(200, 146, 42, 58))
    cd.ellipse((520, -320, 2540, 1360), fill=(240, 234, 216, 18))
    cd.ellipse((3000, -480, 5200, 1560), fill=(200, 146, 42, 44))
    circles = circles.filter(ImageFilter.GaussianBlur(78))
    base.alpha_composite(circles)

    # diagonal cut
    draw.polygon(
        [(0, HEIGHT), (0, 470), (1880, HEIGHT), (0, HEIGHT)],
        fill=(13, 13, 12, 225),
    )

    add_logo(base, x=188, y=116, size=168)
    draw.text((390, 126), "Domus AI", font=SERIF_ITALIC, fill=(240, 234, 216, 245))

    draw.text((188, 294), "Moins d outil.", font=SERIF_TITLE, fill=(240, 234, 216, 245))
    draw.text((1240, 294), "Plus de résultats terrain.", font=SERIF_TITLE, fill=(223, 176, 90, 255))
    draw.text(
        (194, 510),
        "Des assistants IA simples à utiliser pour les agences immobilières indépendantes",
        font=SANS_REGULAR,
        fill=(240, 234, 216, 240),
    )
    draw.text(
        (194, 594),
        "Formation | Cas d usage prioritaires | Mise en place | Suivi équipe",
        font=MONO,
        fill=(185, 176, 158, 235),
    )

    # right lines
    polyline(
        draw,
        [(3020, 140), (3320, 118), (3620, 142), (3920, 196), (4250, 322)],
        fill=(200, 146, 42, 172),
        width=4,
    )
    polyline(
        draw,
        [(2960, 226), (3310, 246), (3660, 314), (4040, 420), (4370, 572)],
        fill=(240, 234, 216, 96),
        width=3,
    )

    add_noise(base, opacity=8)
    save_png(base, "proposition-03-editorial-flux.png")


def write_philosophies() -> None:
    p1 = """# Proposition 01 - Patrimoine Signal

Le langage visuel part d une idée simple : rassurer sans figer. De grands aplats sombres installent une base calme, puis des accents or guident le regard comme des repères de qualité. L espace reste volontairement aérien pour transmettre une promesse claire : l IA vient clarifier le quotidien, pas le compliquer.

Les formes linéaires rappellent les plans architecturaux du secteur immobilier, mais sans illustration littérale. Cette allusion subtile ancre la bannière dans son marché tout en gardant une esthétique premium. La composition est construite pour sembler évidemment juste, avec des alignements nets et un rythme maîtrisé.

La hiérarchie visuelle repose sur un duo serif + sans-serif : la marque affirme son statut, puis le message se lit en une seconde. Chaque niveau de texte est dosé pour rester lisible sur LinkedIn, y compris sur les écrans plus petits.

La finition cherche une exécution méticuleuse : contrastes contrôlés, marges propres, détails discrets mais précis. L objectif est une pièce sobre qui paraît soignée à la main, et qui reste mémorisable sans bruit graphique inutile.
"""

    p2 = """# Proposition 02 - Cadastre Lumineux

Cette direction transforme la bannière en système visuel. La grille et les modules évoquent l idée de process concret : observer, structurer, déployer. Le résultat exprime la promesse de Domus AI avec une lecture très opérationnelle, adaptée à un public qui veut du pratique.

Les blocs sont traités comme un tableau de pilotage élégant. Les étiquettes courtes et les puces chiffrables rappellent des gains réels, pas une promesse abstraite. La forme sert la crédibilité : tout semble organisé, priorisé et prêt à l action.

La palette reste fidèle à la marque (charbon, ivoire, or) mais gagne en rythme grâce aux répétitions géométriques. Cette répétition crée une identité forte sans charger la page. Le regard navigue naturellement du bloc marque vers les preuves terrain.

La qualité d exécution est centrale : coins, espacements, trames, épaisseurs de traits sont ajustés avec précision pour garder une sensation de haut niveau. La bannière doit donner l impression d un dispositif conçu sur mesure, pas d un template.
"""

    p3 = """# Proposition 03 - Editorial Flux

Cette piste adopte une posture plus narrative. Les masses floues et les coupes diagonales installent du mouvement, comme une transition entre charge mentale et clarté opérationnelle. L image raconte une accélération maîtrisée, sans tomber dans l effet technologique caricatural.

La composition laisse respirer le message principal avec une tension visuelle intentionnelle entre crème et or. Le contraste porte le sens : moins d outil pour plus de résultat. Le propos devient immédiat, accessible et humain.

Les lignes à droite servent de fil discret vers l univers immobilier et la notion de trajectoire. Elles créent un second niveau de lecture pour les personnes du secteur, tout en restant esthétiques pour un public plus large.

Le rendu final insiste sur l artisanat visuel : chaque couche est contenue, chaque élément a sa place, chaque écart est mesuré. La pièce vise une présence éditoriale forte et épurée, capable de positionner Domus AI comme une marque experte et lisible.
"""

    (OUTPUT_DIR / "proposition-01-patrimoine-signal-philosophy.md").write_text(p1, encoding="utf-8")
    (OUTPUT_DIR / "proposition-02-cadastre-lumineux-philosophy.md").write_text(p2, encoding="utf-8")
    (OUTPUT_DIR / "proposition-03-editorial-flux-philosophy.md").write_text(p3, encoding="utf-8")


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    banner_01()
    banner_02()
    banner_03()
    write_philosophies()


if __name__ == "__main__":
    main()
