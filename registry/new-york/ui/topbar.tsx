"use client"

import Link from "next/link"
import { mdiDotsGrid, mdiHelpCircleOutline } from "@mdi/js"
import Icon from "@mdi/react"

import { Avatar, AvatarFallback } from "@/registry/new-york/ui/avatar"
import { Button } from "@/registry/new-york/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/registry/new-york/ui/navigation-menu"

interface NavigationItem {
  label: string
  href?: string
  children?: NavigationItem[]
  isActive?: boolean
}

interface TopBarProps {
  className?: string
  logoImageSrc?: string
  logoAlt?: string
  customLogo?: React.ReactNode
  navigationItems?: NavigationItem[]
  showHelpButton?: boolean
  showAvatar?: boolean
  avatarFallback?: string
  actionButtons?: React.ReactNode
}

export function TopBar({ 
  className,
  logoImageSrc = "https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/logo-sitecore",
  logoAlt = "Logo",
  customLogo,
  actionButtons,
  navigationItems = [
    { label: "Home", href: "#" },
    { 
      label: "Content model", 
      children: [
        { label: "Components", href: "#" },
        { label: "Documentation", href: "#" },
        { label: "Blocks", href: "#" }
      ]
    },
    { label: "Content", href: "#" },
    { label: "Media", href: "#" },
    { label: "Settings", href: "#" }
  ],
  showHelpButton = true,
  showAvatar = true,
  avatarFallback = "JD"
}: TopBarProps) {
  return (
    <header className={`shadow-base bg-white z-10 ${className}`}>
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" colorScheme="neutral">
            <Icon path={mdiDotsGrid} size={1} />
          </Button>
          <div className="flex items-center gap-1">
            {customLogo ? (
              customLogo
            ) : (
              <span className="text-xl font-bold text-red-500">
                <img
                  alt={logoAlt}
                  className="rounded-md object-cover object-left p-1"
                  src={logoImageSrc}
                />
              </span>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <NavigationMenu className="ml-6">
          <NavigationMenuList>
            {navigationItems.map((item, index) => (
              <NavigationMenuItem key={index}>
                {item.children ? (
                  <>
                    <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[200px] gap-2">
                        {item.children.map((child, childIndex) => (
                          <li key={childIndex}>
                            <NavigationMenuLink asChild>
                              <Link href={child.href || "#"}>{child.label}</Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <Link href={item.href || "#"} legacyBehavior passHref>
                    <NavigationMenuLink className={`${navigationMenuTriggerStyle()} ${item.isActive ? 'active' : ''}`}>
                      {item.label}
                    </NavigationMenuLink>
                  </Link>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto flex items-center space-x-4">
          {actionButtons}
          {showHelpButton && (
            <Button variant="ghost" size="icon" colorScheme="neutral">
              <Icon path={mdiHelpCircleOutline} size={1} />
            </Button>
          )}
          {showAvatar && (
            <Avatar>
              <AvatarFallback>{avatarFallback}</AvatarFallback>
            </Avatar>
          )}
        </div>
      </div>
    </header>
  )
} 