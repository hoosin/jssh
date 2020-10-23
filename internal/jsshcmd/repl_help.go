package jsshcmd

import "strings"

var replApiList = []string{
	"__version", "__bin", "__pid", "__tmpdir", "__homedir", "__user", "__hostname",
	"__dirname", "__filename", "__args", "__env", "__output", "__outputbytes", "__code",
	"set(", "get(", "format(", "print(", "println(", "sleep(", "exit(", "loadconfig(",
	"fs.readdir(", "fs.readfile(", "fs.stat(", "fs.writefile(", "fs.appendfile(",
	"path.join(", "path.abs(", "path.base(", "path.ext(", "path.dir(",
	"cli.get(", "cli.bool(", "cli.args(", "cli.opts(", "cli.prompt(",
	"http.timeout(", "http.request(", "http.download(",
	"log.info(", "log.error(",
	"sh.setenv(", "sh.exec(", "sh.bgexec(", "sh.chdir(", "sh.cd(", "sh.cwd(", "sh.pwd(",
	"ssh.set(", "ssh.open(", "ssh.close(", "ssh.setenv(", "ssh.exec(",
	"socket.timeout(", "socket.tcpsend(", "socket.tcptest(",
}

func replCompleter(line string) (c []string) {
	line = strings.ToLower(line)
	for _, n := range replApiList {
		if strings.HasPrefix(n, line) {
			c = append(c, n)
		}
	}
	return c
}
