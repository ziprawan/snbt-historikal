# SNBT Historic

Unofficial website project to track SNBT SNMPB historical data easier.

## Setup
1. First, you need to install [Bun runtime](https://bun.sh) and [Python runtime](https://python.org/downloads) (if you want data from SNMPB site)
2. Clone this project using git cli ~~you should know how to use git btw~~
3. Enter to the cloned project directory
4. Run `bun i` to install project dependencies
5. Run `bun run src/database/migrate.ts` to initialize the SQLite3 database
6. If you want dump the SNPMB data, go to `scripts` folder, run `python3 dump.py` (it took ~10 minutes in good connection), and run `bun run scripts/insert_to_db.ts [.db file name in scripts folder] [current year, eg. 2024]` **you can skip this step**
7. If you want use our imported data, you can copy this code `wget https://github.com/hansputera/snbt-historic/releases/download/1.0.0/data.db -O data.db` to your terminal
8. Build the project using `bun run --bun build`
9. Serve the project using `bun run --bun start`

## Credits
- [Aziz Ridhwan Pratama](https://github.com/ziprawan) - Maintainer and Idea project
- [Hanif Dwy Putra S](https://github.com/hansputera) - Maintainer
- [SNPMB BPP - Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi](https://snpmb.bppp.kemdikbud.go.id/)
