
export const sleep = async(timeSleep=3000) => {

    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(true)
        },timeSleep)
    })

}