Option Explicit

Dim fileSystem, shell, projectDirectory, launcherPath, command

Set fileSystem = CreateObject("Scripting.FileSystemObject")
Set shell = CreateObject("WScript.Shell")

projectDirectory = fileSystem.GetParentFolderName(WScript.ScriptFullName)
launcherPath = fileSystem.BuildPath(projectDirectory, "start-website.ps1")

If Not fileSystem.FileExists(launcherPath) Then
    MsgBox "The website launcher could not be found:" & vbCrLf & launcherPath, vbCritical, "NURS 180 Creative Project"
    WScript.Quit 1
End If

command = "powershell.exe -NoProfile -ExecutionPolicy Bypass -File " & Chr(34) & launcherPath & Chr(34)
shell.Run command, 1, False
