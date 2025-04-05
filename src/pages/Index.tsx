
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { GitHubLogo } from "@/components/GitHubLogo";
import { FirebaseLogo } from "@/components/FirebaseLogo";
import { DeploymentStatus } from "@/components/DeploymentStatus";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [environment, setEnvironment] = useState("development");
  const [lastDeployment, setLastDeployment] = useState("Not deployed yet");
  
  useEffect(() => {
    // Simulating loading deployment data
    const timer = setTimeout(() => {
      setLastDeployment(new Date().toLocaleString());
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleDeployClick = () => {
    toast({
      title: "Manual Deployment Triggered",
      description: "Your changes would now be deployed to Firebase.",
    });
    setLastDeployment(new Date().toLocaleString());
  };

  const handleGitHubClick = () => {
    window.open("https://github.com", "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col items-center text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">React CI/CD Pipeline</h1>
          <p className="text-gray-600 max-w-2xl">
            Automatic deployment to Firebase when pushing to the dev branch
          </p>
          <Badge 
            variant={environment === "production" ? "default" : "outline"}
            className="mt-4 px-4 py-1"
          >
            {environment === "production" ? "PRODUCTION" : "DEVELOPMENT"} ENVIRONMENT
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <GitHubLogo className="h-8 w-8 mr-3" />
              <h2 className="text-2xl font-semibold">GitHub Integration</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Push to your dev branch to trigger automatic deployments. The production branch 
              requires manual promotion.
            </p>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Branch:</span>
                <span className="font-medium">{environment === "production" ? "main" : "dev"}</span>
              </div>
              <Button variant="outline" onClick={handleGitHubClick}>
                View Repository
              </Button>
            </div>
          </Card>

          <Card className="p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <FirebaseLogo className="h-8 w-8 mr-3" />
              <h2 className="text-2xl font-semibold">Firebase Hosting</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Your app is automatically deployed to Firebase Hosting whenever you push to the dev branch.
            </p>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Last Deployment:</span>
                <span className="font-medium">{lastDeployment}</span>
              </div>
              <Button onClick={handleDeployClick}>
                Manual Deploy
              </Button>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="workflow" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="workflow">CI/CD Workflow</TabsTrigger>
            <TabsTrigger value="config">Firebase Config</TabsTrigger>
            <TabsTrigger value="deployments">Recent Deployments</TabsTrigger>
          </TabsList>
          <TabsContent value="workflow" className="mt-4">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">GitHub Actions Workflow</h3>
              <DeploymentStatus />
              <Separator className="my-4" />
              <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <pre className="text-xs md:text-sm">
                  {`name: Firebase Deploy
on:
  push:
    branches: [ dev ]
  
jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v1
        with:
          node-version: '16'
      - run: npm ci
      - run: npm run build
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: "\${{ secrets.GITHUB_TOKEN }}"
          firebaseServiceAccount: "\${{ secrets.FIREBASE_SERVICE_ACCOUNT }}"
          channelId: live
          projectId: your-firebase-project-id`}
                </pre>
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="config" className="mt-4">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Firebase Configuration</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">firebase.json</h4>
                  <div className="bg-gray-100 p-4 rounded-md overflow-x-auto mt-2">
                    <pre className="text-xs md:text-sm">
                      {`{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}`}
                    </pre>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium">.firebaserc</h4>
                  <div className="bg-gray-100 p-4 rounded-md overflow-x-auto mt-2">
                    <pre className="text-xs md:text-sm">
                      {`{
  "projects": {
    "default": "your-firebase-project-id"
  }
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="deployments" className="mt-4">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Recent Deployments</h3>
              <div className="space-y-4">
                {[
                  { date: new Date().toLocaleString(), status: "success", message: "Initial deployment" },
                  { date: new Date(Date.now() - 86400000).toLocaleString(), status: "success", message: "Update landing page" },
                  { date: new Date(Date.now() - 172800000).toLocaleString(), status: "failed", message: "Fix styling issues" },
                ].map((deployment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div>
                      <p className="font-medium">{deployment.message}</p>
                      <p className="text-sm text-gray-500">{deployment.date}</p>
                    </div>
                    <Badge variant={deployment.status === "success" ? "success" : "destructive"}>
                      {deployment.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-100">
          <h3 className="text-xl font-semibold mb-2">Getting Started</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Push your code to GitHub (dev branch for auto-deployment)</li>
            <li>Set up Firebase project and add credentials to GitHub secrets</li>
            <li>Create a <code className="bg-gray-100 px-1 py-0.5 rounded">.github/workflows/firebase-deploy.yml</code> file</li>
            <li>Add Firebase configuration files to your project</li>
            <li>Enjoy automatic deployments!</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Index;
