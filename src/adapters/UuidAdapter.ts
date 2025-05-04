import type { UuuidGenerator } from "./UuidGenerator";

import {v4 as uuidv4} from 'uuid'

export class UuidAdapter implements UuuidGenerator {

    generate(): string {
        return uuidv4()
    }

}