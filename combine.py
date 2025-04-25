import os
import pandas as pd
from glob import glob

directory = "/home/vnr/Downloads/combine/"
output_file = os.path.join(directory, "combined_output.xlsx")

xlsx_files = glob(os.path.join(directory, "*.xlsx"))

all_data = []

for file in xlsx_files:
    if os.path.basename(file) != "combined_output.xlsx":
        df = pd.read_excel(file)
        df['Source File'] = os.path.basename(file)  # optional, for traceability
        all_data.append(df)

if all_data:
    combined_df = pd.concat(all_data, ignore_index=True)
    combined_df.to_excel(output_file, index=False)
    print(f"✅ Combined into: {output_file}")
else:
    print("❌ No valid .xlsx files found to combine.")

