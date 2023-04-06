import { ColorMethods, FirebaseConfig, HSLAColor } from "../";
import { FB } from "./firebase";
import { Generic } from "./generic";
import { color } from "./color";
export class Logic {
  fb: FB;

  perms() {
    window.location.href = "/perms";
  }

  auth() {
    window.location.href = "/auth";
  }

  other() {
    window.location.href = "/other";
  }
  color:ColorMethods =  color;
  generic: Generic;
  api = "https://us-central1-eloiselife-c5cf6.cloudfunctions.net/api";

  constructor(config: FirebaseConfig) {
    this.fb = new FB(config);

    this.generic = new Generic(this.perms,this.fb,this.auth, this.other, this.api);
  }
  
}
