using System;
using System.Diagnostics;
using System.IO;
using System.Windows.Forms;

namespace AgriTechDesktop
{
    static class Program
    {
        [STAThread]
        static void Main()
        {
            try
            {
                string appDir = AppDomain.CurrentDomain.BaseDirectory;
                string htmlPath = Path.Combine(appDir, "index.html");

                if (!File.Exists(htmlPath))
                {
                    MessageBox.Show("Could not find index.html at:\n" + htmlPath, "AgriTech - File Missing", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    return;
                }

                string fileUri = "file:///" + htmlPath.Replace("\\", "/");

                // Locate Microsoft Edge or Google Chrome executable for native chromeless App Mode
                string edgePath = @"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe";
                if (!File.Exists(edgePath))
                {
                    edgePath = @"C:\Program Files\Microsoft\Edge\Application\msedge.exe";
                }

                string chromePath = @"C:\Program Files\Google\Chrome\Application\chrome.exe";
                if (!File.Exists(chromePath))
                {
                    chromePath = @"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe";
                }

                string browserExe = null;
                if (File.Exists(edgePath))
                {
                    browserExe = edgePath;
                }
                else if (File.Exists(chromePath))
                {
                    browserExe = chromePath;
                }

                if (browserExe != null)
                {
                    // Launch in standalone App Window Mode with custom window size
                    ProcessStartInfo psi = new ProcessStartInfo();
                    psi.FileName = browserExe;
                    psi.Arguments = string.Format("--app=\"{0}\" --window-size=1366,820", fileUri);
                    psi.UseShellExecute = false;
                    Process.Start(psi);
                }
                else
                {
                    // Fallback to default system handler
                    ProcessStartInfo psiFallback = new ProcessStartInfo(fileUri);
                    psiFallback.UseShellExecute = true;
                    Process.Start(psiFallback);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Error launching AgriTech Desktop App:\n" + ex.Message, "AgriTech Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
    }
}