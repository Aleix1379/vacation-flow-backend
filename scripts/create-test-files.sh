#!/bin/bash

# Obtener la ruta absoluta del directorio raíz del proyecto
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"  # Directorio donde está el script
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"                   # Directorio raíz del proyecto

# Base directory for the source code
BASE_DIR="$PROJECT_ROOT/src"

# Directory where test files will be created
TEST_DIR="$PROJECT_ROOT/test"

# Function to create empty test files
create_test_file() {
  local source_file="$1"
  local test_file="$2"

  # Create the necessary directory if it doesn't exist
  mkdir -p "$(dirname "$test_file")"

  # Create the test file only if it doesn't already exist
  if [ ! -f "$test_file" ]; then
    touch "$test_file"
    echo "✅ Created: $test_file"
  else
    echo "ℹ️ File already exists: $test_file"
  fi
}

# Change to the project root directory
cd "$PROJECT_ROOT" || { echo "❌ Failed to change to project root directory"; exit 1; }

# Find all .ts files in the source directory and create corresponding test files
echo "🔍 Searching for .ts files in $BASE_DIR..."
find "$BASE_DIR" -type f -name "*.ts" | while read -r source_file; do
  # Generate the corresponding test file path
  test_file="${source_file#$BASE_DIR/}"               # Remove the "src/" prefix
  test_file="$TEST_DIR/$test_file"                    # Add the "test/" prefix
  test_file="${test_file%.ts}.spec.ts"                # Replace ".ts" with ".spec.ts"

  # Call the function to create the test file if it doesn't exist
  create_test_file "$source_file" "$test_file"
done

echo "🎉 All missing test files have been created."
