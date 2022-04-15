import { Model } from '../interfaces/model.i';
import * as Models from '../models/_export';
import { Process } from '../interfaces/process.i';

declare var process: Process;

class AutoLoad {
    public model: Model | undefined;

    constructor() {
        const model: string = this.constructor.name;

        if (model in Models) {
            const allModels: any = Models;
            this.model = new (allModels[model])(process.db);
        } else {
            this.model = undefined;
        }
    }
}

export default AutoLoad;
