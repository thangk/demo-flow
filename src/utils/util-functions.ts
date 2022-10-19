

export const capitalizeFromPathName = (pathname: string) => {

    if (pathname === '/') return 'Dashboard'

    return pathname.slice(1).split('/')
                        .map(item => item.replace('-', ' '))
                        .map(item => item.split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')).join(' > ')
}