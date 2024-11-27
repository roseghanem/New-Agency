const PluggedInModules = {}

// try {
    PluggedInModules['influencers'] = {path: require('@devModules/influencers'), enabled: true, enableRoutes: true, enableNavigations: true, moduleGroups: ['user']} // Admin Influencers Module
// } catch (e) {
    // console.error('no Admin Influencers Module', e)
// }

try {
    PluggedInModules['scraping'] = {path: require('@devModules/scraping'), enabled: true, enableRoutes: true, enableNavigations: true, moduleGroups: ['user']} // Scraping Module
} catch (e) {
    // console.error('no Scraping Module', e)
}

try {
    PluggedInModules['user'] = {path: require('@devModules/user'), enabled: true, enableRoutes: true, enableNavigations: true, moduleGroups: ['user']} // User Module
} catch (e) {
    // console.error('no User Module', e)
}

try {
    PluggedInModules['rolespermissions'] = {path: require('@devModules/rolespermissions'), enabled: true, enableRoutes: true, enableNavigations: true, moduleGroups: ['user']} // Roles & Permissions Module
} catch (e) {
    // console.error('no Roles & Permissions Module', e)
}

try {
    PluggedInModules['artist'] = {path: require('@devModules/artist'), enabled: true, enableRoutes: true, enableNavigations: true, moduleGroups: ['artist']} // Artist/Curator Module ()
} catch (e) {
    // console.error('no Artist/Curator Module', e)
}

export default PluggedInModules
