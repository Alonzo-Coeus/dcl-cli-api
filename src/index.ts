import {Decentraland} from '../cli/src/lib/Decentraland';
import {ethers} from 'ethers';
import { SceneMetadata } from 'cli/src/lib/Project';
import { BoilerplateType } from 'cli/src/lib/Project';

export class Decentraland_CLI_API {
    wallet: ethers.Wallet;
    dclInstance: Decentraland;

    constructor (privateKey : string)
    {
        this.wallet = new ethers.Wallet(privateKey);
        this.dclInstance = new Decentraland({
            workingDir: process.cwd(),
            wallet: this.wallet
        });
    }

    async init(dir: string)
    {
        const sceneMeta = {
            display: { title: dcl.project.getRandomName() },
            contact: {
              name: '',
              email: ''
            },
            owner: '',
            scene: {
              parcels: ['0,0'],
              base: '0,0'
            },
            communications: {
              type: 'webrtc',
              signalling: 'https://rendezvous.decentraland.org'
            },
            policy: {
              fly: true,
              voiceEnabled: true,
              blacklist: [],
              teleportPosition: '0,0,0'
            },
            main: 'scene.xml'
          }
        
          await this.dclInstance.init(sceneMeta as SceneMetadata, BoilerplateType.ECS as BoilerplateType)
    }

    async deploy(dir: string): Promise<string>
    {
        try {
            this.dclInstance.updateWorkingDir(dir);
            let dclIgnore = await this.dclInstance.project.getDCLIgnore();
            let dclFiles = await this.dclInstance.project.getFiles(dclIgnore);
            this.dclInstance.deploy(dclFiles);
            return "success";
        } catch (e) {
            return e;
        }
    }    
} 