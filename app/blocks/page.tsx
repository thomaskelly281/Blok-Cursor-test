import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/new-york/ui/tabs"
import PageWithSidebar from "@/registry/new-york/blocks/page-with-sidebar/page"
import ConfigurationPage from "@/registry/new-york/blocks/configuration-page/page"

export default function BlocksPage() {
  return (
    <div className="container py-6">
      <div className="flex flex-col gap-4 px-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Blocks</h1>
          <p className="text-muted-foreground">
            A collection of reusable blocks for your application.
          </p>
        </div>
        <Tabs defaultValue="pageWithSidebar" className="w-full">
          <TabsList>
            <TabsTrigger value="pageWithSidebar">Page with sidebar</TabsTrigger>
            <TabsTrigger value="configurationPage">Configuration page</TabsTrigger>
            <TabsTrigger value="xmMarketplaceApp">XM Marketplace app</TabsTrigger>
            <TabsTrigger value="aiChat">AI Chat</TabsTrigger>
          </TabsList>
          <TabsContent value="pageWithSidebar" className="mt-4">
            <div className="rounded-lg border">
              <PageWithSidebar />
            </div>
          </TabsContent>
          <TabsContent value="configurationPage" className="mt-4">
            <div className="rounded-lg border">
              <ConfigurationPage />
            </div>
          </TabsContent>
          <TabsContent value="xmMarketplaceApp" className="mt-4">
          </TabsContent>
          <TabsContent value="aiChat" className="mt-4">
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
