import fs from 'fs';


class IdManager {
    constructor(path) {
        this.path = path;
    }

    async init(){
            try{
                const exists = await fs.promises.access(this.path);
            }catch(err){
                console.log("Se está creando un nuevo archivo: productLastId");
                await fs.promises.writeFile(this.path, JSON.stringify(0));
            }
        }

    readLastId() {
        try {
            const resp = fs.readFileSync(this.path);
            const lastId = parseInt(JSON.parse(resp));
            return lastId;
        } catch (error) {
            console.log(error);
        }
    }

    saveLastId() {
        try {
            const lastId = this.readLastId();
            fs.writeFileSync(this.path,JSON.stringify(lastId+1));
        } catch (error) {
            console.log("Tenemos un error al guardar el archivo: productLastId");
        }
    }

}


export default IdManager;