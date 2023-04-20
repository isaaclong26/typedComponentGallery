
/**
 * Chat Gpt Text Functions
 */
export interface GptText {

    parseList: (text: string) => Promise<string[]>
}
export const gptText: GptText = {

    parseList : async (text:string)=>{
        let ots = [""]

        return ots

    }

  

}