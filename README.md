![MARCOS Logo](./public/marcos.png)

# Metro And Rail Carriage Optimization System

**Which carriage door, for which exit, for which station?**

<div align="center">

**[🚇 Try MARCOS Live →](https://marcos-dzb.pages.dev/)** • **[📖 View Documentation ↓](#station-data-format)**

</div>

MARCOS helps you find the best carriage and door position for your metro exit. Don't waste time fighting through the crowds at platforms — know exactly where to stand for the fastest exit.

## What is MARCOS?

MARCOS is a simple web application, built on top of a crowdsourced, verified database, that tells you which carriage and door to use when traveling on a metro system, so you can exit at the most convenient point for your destination.

Simply select your metro system, line, departure station, and destination station, and MARCOS will show you the optimal carriage and door positions for each exit at your destination.

## How to Contribute

We welcome contributions! The easiest way to help is by adding station data for your local metro system.

### Where Data is Stored

All station data is stored in YAML files in the `data/systems/` directory:

```
data/systems/
├── systems.yaml                    # List of all metro systems
├── london_underground/
│   ├── lines.yaml                  # Lines for this system
│   └── stations/
│       └── tottenham_court_road.yaml
└── nyc_subway/
    ├── lines.yaml
    └── stations/
        └── station_name.yaml
```

### Station Data Format {#station-data-format}

Each station is stored as a YAML file following this simple format. Here's the example from **Tottenham Court Road**:

```yaml
station_name: Tottenham Court Road
status: dummy

platforms:
  central:
    eastbound:
      door_side: right
      exits:
        northern: 4.2
        oxford_street_east: 1.2
    westbound:

  northern:
    southbound:
      door_side: right
      exits:
        central: 1.3
        street: 6.3
    northbound:
      door_side: right
      exits:
        central:eastbound: 1.3
        street: 6.3
```

### Format Guide

- **`station_name`**: The display name of the station (optional)
- **`status`**: Set to `"dummy"` for placeholder/test data (optional)
- **`platforms`**: A dictionary where each key is a **line ID** (must match an ID in `lines.yaml`)
  - Each line contains **directions** (e.g., `eastbound`, `westbound`, `northbound`, `southbound`, `uptown`, `downtown`)
  - Each direction can have:
    - **`door_side`**: Which side of the train the doors are on (`left` or `right`)
    - **`exits`**: A dictionary mapping exit names to carriage/door positions

### Carriage/Door Format

Values like `4.2` mean:

- **`4`** = 4th carriage (counting from the front of the train)
- **`2`** = 2nd door (on that carriage)

So `4.2` means "4th carriage, 2nd door".

### Adding a New Station

1. **Find the station ID**: Use a lowercase, underscore-separated version of the station name

   - Example: "Tottenham Court Road" → `tottenham_court_road`

2. **Create the YAML file**:

   - Location: `data/systems/[system_id]/stations/[station_id].yaml`
   - Example: `data/systems/london_underground/stations/tottenham_court_road.yaml`

3. **Add the basic structure**:

   ```yaml
   station_name: Your Station Name

   platforms:
     line_id:
       direction:
         door_side: right
         exits:
   ```

4. **Add exits for each direction**: For each platform direction, add the exits with their carriage/door positions:

   ```yaml
   exits:
     exit_name: 4.2
     another_exit: 1.1
   ```

5. **Test locally**: Run `npm run dev` and verify your station appears and works correctly

6. **Submit a Pull Request**: Once you've added your station data, submit a PR to the repository!

### Adding Exits to a Station

To add exits to an existing station:

1. **Open the station's YAML file** in `data/systems/[system_id]/stations/[station_id].yaml`

2. **Find the platform and direction** you want to add exits to

3. **Add exit entries** under the `exits:` section:

   ```yaml
   platforms:
     central:
       eastbound:
         door_side: right
         exits:
           new_exit_name: 3.1 # 3rd carriage, 1st door
           another_exit: 5.2 # 5th carriage, 2nd door
   ```

4. **Exit names** should be lowercase with underscores (e.g., `oxford_street_east`, `main_entrance`)

5. **Carriage/door format**: Always use `carriage.door` (e.g., `4.2`, `1.1`, `6.3`)

### Tips for Collecting Data

- **Stand at different positions** in the train and note which exit you're closest to
- **Count carriages from the front** of the train (the first carriage is `1`)
- **Count doors on each carriage** (the first door is `1`)
- **Note the direction** you're traveling (important for platforms on different sides)
- **Mark as `status: dummy`** if you're unsure about the accuracy

### Example: Complete Station Entry

```yaml
station_name: Example Station

platforms:
  central:
    eastbound:
      door_side: right
      exits:
        main_entrance: 2.1
        side_exit: 4.2
    westbound:
      door_side: left
      exits:
        main_entrance: 3.1
        side_exit: 5.2
```

## Getting Started (Development)

```bash
# Install dependencies
npm install

# Generate data module (reads YAML files)
npm run generate-data

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

- `data/systems/` - Metro system data (YAML files)
- `app/` - Next.js application
- `lib/data.ts` - Data access functions (uses generated static data)
- `scripts/generate-data.ts` - Build script that converts YAML to TypeScript

## License

This project is open source. Contributions welcome!
