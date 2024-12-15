import fs from 'fs';


class IdCartManager {
    constructor(path) {
        this.path = path;
    }

    async init(){
            try{
                const exists = await fs.promises.access(this.path);
            }catch(err){
                console.log("Se está creando un nuevo archivo: cartLastId")
                await fs.promises.writeFile(this.path, JSON.stringify(0));
            }
        }

    readLastId() {
        try {
            const resp = fs.readFileSync(this.path);
            const lastIdCart = parseInt(JSON.parse(resp));
            return lastIdCart;
        } catch (error) {
            console.log(error)
        }
    }

    saveLastId() {
        try {
            const lastIdCart = this.readLastId();
            fs.writeFileSync(this.path,JSON.stringify(lastIdCart+1));
        } catch (error) {
            console.log("Tenemos un error al guardar el archivo: cartLastId");
        }
    }
}


export default IdCartManager;