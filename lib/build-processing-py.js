"use babel"

var fs = require("fs");
var path = require("path");

export function provide(){
	return class ProcessingPyBuildProvider {
		constructor(cwd){
			this.cwd = cwd;
		}

		getNiceName(){
			return "Processing.py";
		}

		isEligible(){
			if(fs.existsSync(path.join(this.cwd, path.basename(this.cwd) + ".pyde"))){
				return true;
			} else {
				return false;
			}
		}

		settings(){
			function config(mode, name){
                editor = atom.workspace.getActiveTextEditor()
                sketch_path = editor.buffer.file.getParent().path
                sketch = fs.readdirSync(sketch_path).filter(s => s.includes('.pyde'))
				return {
					"exec": "processing-py",
					"name": name,
					"args": [sketch],
					"errorMatch": [
                        // 'message' at 'line':'col' in 'filename'
						"\n(?<message>.+) at (?<line>\\d+):(?<col>\\d+) in (?<file>[0-9a-zA-Z]+)"
					]
				}
			}

			return [
				config("run", "Processing.py - Run sketch")
			];
		}
	}
}
