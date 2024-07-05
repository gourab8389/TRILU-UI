import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components'

interface usserDetails{
    email:string,
    name:string,
    userImg:string | undefined,
}

function UserNav({email, name, userImg}:usserDetails) {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className='relative h-10 w-10 rounded-full'>
                <Avatar className='h-10 w-10'>
                <AvatarImage src={userImg} alt='User Image'/>
                <AvatarFallback>{name.slice(0,3)}</AvatarFallback>
                </Avatar>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56' align='end' forceMount>
            <DropdownMenuLabel className='font-normal'>
                <div className="flex flex-col space-y-1">
                    <p className='text-sm font-medium leading-none'>{name}</p>
                    <p className='text-xs leading-none text-muted-foreground'>
                        {email}
                    </p>
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator/>
            <DropdownMenuGroup>
                <DropdownMenuItem>
                    test item
                </DropdownMenuItem>
                <DropdownMenuItem>
                    test item
                </DropdownMenuItem>
                <DropdownMenuItem>
                    test item
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator/>
            <DropdownMenuItem asChild>
                <LogoutLink>
                    Log Out
                </LogoutLink>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserNav
