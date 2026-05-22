import re
import uuid

markdown_table = """
| Category | Product | Size | Length | Colour / Type | Thickness | Other Specs |
|----------|---------|------|--------|----------------|------------|--------------|
| **Greenhouse** | Greenhouse Adhesive Tape | – | 25 m | – | – | – |
| | Tapping Screw | 8 mm | – | – | – | – |
| | Seedling Trays | 200 / 288 holes | – | – | – | – |
| | Greenhouse Polythene | – | – | Yellow (UV Block) / Nectarine (UV Open) | – | – |
| | Greenhouse Profiles | 42 m | – | – | – | – |
| | Zigzag Wire | – | – | – | – | – |
| | Mulch Film | – | – | Black | 60 / 80 µm | – |
| **Dripline (16mm)** | 16mm Dripline (single/double emitters) | 75 / 90 / 110 mm (PN6–20) | 1000 m roll | – | 0.3 / 0.4 mm | Pressure 1.2–1.4 bar; Spacing 10–40 cm |
| | Starter with Double Outlet | 16 mm | – | – | – | – |
| | Drip Starter Takeoff | 16 mm | – | – | – | – |
| | PE End Cap | 16 mm | – | – | – | – |
| | PE to Drip Connector | 16 mm | – | – | – | – |
| | End Cap 16 | 16 mm | – | – | – | – |
| | 16mm Manual Endcap | 16 mm | – | – | – | – |
| | Fixing Stake for Ground Pipes | – | – | – | – | – |
| | Adjustable Button Dripper | – | – | – | – | Adjustable flow |
| | Button Dripper | – | – | – | – | Fixed flow |
| **Pipes** | HDPE Pipe | 32 – 160 mm | 6 m | – | – | PN6 (Class B) / PN10 (Class C) |
| | Rain Hose Pipe | 32 / 40 / 50 mm | – | – | 0.45 mm | – |
| | Garden Hose Pipe | ½″, ¼″, 1″ | 60 / 120 ft | – | – | – |
| **HDPE Fittings** | Male/Female Coupling | 20 – 110 mm × ½″ – 4″ | – | – | – | – |
| | Connector Coupling / End Cap | 20 – 110 mm | – | – | – | – |
| | Coupling Elbow (90°) | 20 – 110 mm | – | – | – | – |
| | Male/Female Elbow Coupling | 20 – 110 mm × ½″ – 4″ | – | – | – | – |
| | Male/Female Threaded Tee | 20 – 110 mm × ½″ – 4″ | – | – | – | – |
| | Coupling Tee 90° | 20 – 110 mm | – | – | – | – |
| | Saddle Clamp | 25 – 110 mm × ½″ – 4″ | – | – | – | – |
| | PVC Tank Connector | 20 – 110 mm | – | – | – | – |
| | Reducing Bush | 32 – 110 mm | – | – | – | – |
| | PVC Four Way Cross | 20 – 110 mm | – | – | – | – |
| | PVC Elbow 45° / 90° | 20 – 110 mm | – | – | – | – |
| | PVC Female Thread Elbow | ¾″ – 1½″ | – | – | – | – |
| | PVC Reducing Tee | 32 – 110 mm | – | – | – | – |
| | PVC Tee | 32 – 110 mm | – | – | – | – |
| | PVC Glue (Medium / High Bodied) | 946 / 473 / 237 ml | – | – | – | – |
| **Crop Planter & Mulch** | Crop Planter | – | – | – | – | – |
| | Mulch Film (Damlino) | 0.3 / 0.5 / 0.75 mm | – | – | – | – |
| **Shade Nets** | Flower Bud Net | 25 mm | 500 m | – | – | – |
| | Shade Net (Black/Green) | 3 m / 2.5 m | 50 m | Black, Green | 70–140 GSM | 50–80% shade |
| **Rain Hose Fittings** | Straight / Male / Female Coupling | 32 / 40 / 50 mm | – | – | – | – |
| | End Cap | 32 / 40 / 50 mm | – | – | – | – |
| | Threaded Reducing Nipple | 1″ – 2″ | – | – | – | – |
| | Threaded Nipple | 1″, 1¼″, 1½″, 2″ | – | – | – | – |
| | Screen Type Filter | 25 – 110 mm | – | – | – | – |
| | Disc Type Filter | 63 mm (standard & big) | – | – | – | – |
| **Valves & Venturi** | Venturi | 32 / 40 / 50 / 63 mm | – | – | – | – |
| | Air Release Valve | 25 / 32 / 40 / 50 / 63 mm | – | – | – | – |
| **Micro Irrigation** | Ground Micro Sprinkler Set | – | – | – | – | Complete set |
| | Ground Micro Irrigation Spike Set | – | – | – | – | Spike-mounted |
| | Ground Micro Sprinkler | – | – | – | – | Single unit |
| | Micro Sprinkler | – | – | – | – | General use |
| | Micro Greenhouse Sprinkler Set | – | – | – | – | For greenhouses |
| | Greenhouse 4‑Way Mist Set | – | – | – | – | 4‑way misting |
| | Micro Irrigation Pot Dripper | – | – | – | – | For potted plants |
| | Greenhouse Micro Irrigation Hanging Set | – | – | – | – | Hanging type |
| | 7 Valve Middle Connector | – | – | – | – | 7‑port |
| | Micro Irrigation Tee | – | – | – | – | Tee connector |
| **Sprinklers & Rain Guns** | Mini Sprinkler (plastic) | ½″ inlet | – | – | – | 5–10 m range |
| | Sprinkler (plastic) | ½″ inlet | – | – | – | 9–11 m range |
| | Sprinkler (plastic) | ¾″ inlet | – | – | – | 12–15 m range |
| | Sprinkler (plastic) | ½″ inlet | – | – | – | 10–15 m range |
| | Metal Mini Sprinkler | ½″ inlet | – | – | – | 9–11 m range |
| | Metal Sprinkler | 1″ inlet | – | – | – | 9–11 m range |
| | Metallic Rain Gun | 32 / 50 / 63 mm | – | – | – | – |
| | Rain Gun Stand | 32 / 50 / 63 mm | – | – | – | – |
| | Plastic Rain Gun | 32 / 50 mm | – | – | – | – |
| | Pop Up Sprinkler | ½″, ¾″ | – | – | – | – |
| **Trellising & Clamps** | Eye Bolt | – | – | – | – | – |
| | C Clamp | – | – | – | – | – |
| | G Clamp | – | – | – | – | – |
| | Trellising Twines | – | – | – | – | – |
"""

lines = markdown_table.strip().split('\\n')
current_category = ""

sql_statements = []

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

def clean_val(val):
    val = val.strip()
    if val == '–' or val == '':
        return 'NULL'
    val = val.replace("'", "''")
    return f"'{val}'"

for line in lines:
    if not line.startswith('|') or '---' in line or 'Category |' in line:
        continue
    
    parts = [p.strip() for p in line.split('|')[1:-1]]
    if len(parts) < 7:
        continue
        
    cat_raw, prod, size, length, colour, thickness, specs = parts
    
    if cat_raw and cat_raw != '–':
        current_category = cat_raw.replace('*', '').strip()
        
    prod = prod.strip()
    if not prod:
        continue
        
    prod_id = slugify(current_category + ' ' + prod)
    # Using 'misc' or something if category_id isn't known, but let's assume category_id is slug of category
    cat_id = slugify(current_category)
    
    v_size = clean_val(size)
    v_length = clean_val(length)
    v_colour = clean_val(colour)
    v_thick = clean_val(thickness)
    v_specs = clean_val(specs)
    
    sql = f"INSERT INTO products (id, category_id, name, size, length, colour_or_type, thickness, other_specs) VALUES ('{prod_id}', '{cat_id}', '{prod.replace(chr(39), chr(39)+chr(39))}', {v_size}, {v_length}, {v_colour}, {v_thick}, {v_specs}) ON CONFLICT (id) DO UPDATE SET size=EXCLUDED.size, length=EXCLUDED.length, colour_or_type=EXCLUDED.colour_or_type, thickness=EXCLUDED.thickness, other_specs=EXCLUDED.other_specs;"
    sql_statements.append(sql)

with open('c:\\\\Users\\\\Administrator\\\\Desktop\\\\CODE\\\\drip\\\\insert_catalogue.sql', 'w', encoding='utf-8') as f:
    f.write('\\n'.join(sql_statements))
    f.write('\\n')

print("Generated insert_catalogue.sql")
