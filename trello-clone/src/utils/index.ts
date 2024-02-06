
export const fakeID = (): number => {
    const random = (Math.random() * 10000) + 1000 

    return parseInt(Date.now().toString().slice(0, 5)+ random.toString()) ;
}