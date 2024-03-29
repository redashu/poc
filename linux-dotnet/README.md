
### Installing on rhel 9 -- dotnet-8-sdk

```
dnf install dotnet-sdk-8.0
```

## Dotnet basic command 

### code using c#

```
[ashu@ip-172-31-63-158 ConsoleApp1]$ pwd
/home/ashu/code/ConsoleApp1
[ashu@ip-172-31-63-158 ConsoleApp1]$ ls
bin  ConsoleApp1.csproj  obj  Program.cs
[ashu@ip-172-31-63-158 ConsoleApp1]$ cat  Program.cs 
// See https://aka.ms/new-console-template for more information
Console.WriteLine("Hello, World!");
```

### how to run 

```
[ashu@ip-172-31-63-158 ConsoleApp1]$ dotnet run
Hello, World!
```

## Creating a dotnet core webapp

### Example 

```
dotnet new <template_type> -n <project_name> -o <output_directory>
```

### let's try 

```
dotnet new webapp -n AspNetCoreDemo -o firstwebapp 
The template "ASP.NET Core Web App (Razor Pages)" was created successfully.
This template contains technologies from parties other than Microsoft, see https://aka.ms/aspnetcore/8.0-third-party-notices for details.

Processing post-creation actions...
Restoring /home/ashu/code/firstwebapp/AspNetCoreDemo.csproj:
  Determining projects to restore...
  Restored /home/ashu/code/firstwebapp/AspNetCoreDemo.csproj (in 339 ms).
Restore succeeded.


[ashu@ip-172-31-63-158 code]$ ls
ConsoleApp1  ConsoleApp1.sln  firstwebapp
[ashu@ip-172-31-63-158 code]$ cd firstwebapp/
[ashu@ip-172-31-63-158 firstwebapp]$ ls
appsettings.Development.json  appsettings.json  AspNetCoreDemo.csproj  obj  Pages  Program.cs  Properties  wwwroot
[ashu@ip-172-31-63-158 firstwebapp]$ 
```

### publish code to a directory so that we can host with some web server

```
 ls
appsettings.Development.json  AspNetCoreDemo.csproj  obj    Program.cs  wwwroot
appsettings.json              bin                    Pages  Properties


[ashu@ip-172-31-63-158 firstwebapp]$ dotnet publish
MSBuild version 17.8.3+195e7f5a3 for .NET
  Determining projects to restore...
  All projects are up-to-date for restore.
  AspNetCoreDemo -> /home/ashu/code/firstwebapp/bin/Release/net8.0/AspNetCoreDemo.dll
  AspNetCoreDemo -> /home/ashu/code/firstwebapp/bin/Release/net8.0/publish/


====>copy code to new directory

mkdir ~/var
[ashu@ip-172-31-63-158 firstwebapp]$ cp -arfv bin/Release/net8.0/publish/ ~/var/firstproject


```

### lets run dll file 

```
dotnet  AspNetCoreDemo.dll --urls=http://0.0.0.0:5001
```
