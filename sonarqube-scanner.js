const scanner = require('sonarqube-scanner');
scanner(
    {
        serverUrl: "http://172.16.3.93:32768/", 
        token:"023fd0931ff40cbaf877e3231f92ea3fb8442bb8",
        options: {
            "sonar.projectName": "AEConsole",
            "sonar.projectDescription": "AEConsole React project.",
            "sonar.sources": "./src",
            "sonar.coverage.exclusions": "./src/assets/**/*,./src/scss/**/*"
        },
        
    },
    () => process.exit()
);