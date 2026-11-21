Set oWS = WScript.CreateObject("WScript.Shell")
sDesktop = oWS.SpecialFolders("Desktop")
sScriptDir = CreateObject("Scripting.FileSystemObject").GetParentFolderName(WScript.ScriptFullName)
sTarget = sScriptDir & "\AgriTech.exe"

Set oLink = oWS.CreateShortcut(sDesktop & "\AgriTech.lnk")
oLink.TargetPath = sTarget
oLink.WorkingDirectory = sScriptDir
oLink.Description = "AgriTech - Smart Farmer Advisory, Weather & Mandi Intelligence"
oLink.Save()

MsgBox "AgriTech shortcut has been successfully placed on your Desktop!", 64, "AgriTech Installed"