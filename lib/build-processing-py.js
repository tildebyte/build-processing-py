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
				return {
					"exec": "processing-py",
					"name": name,
					"args": ["\"{FILE_ACTIVE_PATH}\""],
					"errorMatch": [
						"\n(?<file>[\\\/0-9a-zA-Z\\._]+):(?<line>\\d+):(?<col>\\d+)"
					]
				}
			}

			return [
				config("run", "Processing.py - Run sketch")
			];
		}
	}
}
