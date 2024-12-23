const isQuestionnaireComplete = (user) => {
    if( !user || Object.keys(user).length === 0 )
        return false

    if(!user.labels || user.labels.length === 0)
        return false

    return true
} 

const isProfileComplete = (user) => {
    const copy = {...user}
    delete copy.labels
    if( !copy || Object.keys(copy).length === 0 )
        return false
    
    if(Object.values(copy).length === 0 || Object.values(copy).includes(null))
        return false

    return true
}

export { isProfileComplete , isQuestionnaireComplete}