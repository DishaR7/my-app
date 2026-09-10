import json
from pathlib import Path

# Path to the React app's vehicles.json
vehicles_path = Path(__file__).parent.parent / "vehicle-app" / "public" / "vehicles.json"

# Read JSON file
data = json.loads(vehicles_path.read_text())

# Count vehicles by status
summary = {}

for vehicle in data["vehicles"]:
    status = vehicle["status"]
    summary[status] = summary.get(status, 0) + 1

# Print summary
print("Vehicle Status Summary:")
for status, count in summary.items():
    print(f"{status}: {count}")

# Write summary to summary.json
summary_path = Path(__file__).parent / "summary.json"
summary_path.write_text(json.dumps(summary, indent=2))

print(f"\nSummary written to: {summary_path}")