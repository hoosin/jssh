/** JSSH版本号 */
declare const __version: string;

/** JSSH二进制文件路径 */
declare const __bin: string;

/** 当前进程PID */
declare const __pid: number;

/** 临时文件目录 */
declare const __tmpdir: string;

/** 当前用户HOME目录 */
declare const __homedir: string;

/** 当前主机名 */
declare const __hostname: string;

/** 当前脚本目录名 */
declare var __dirname: string;

/** 当前脚本文件名 */
declare var __filename: string;

/** 当前命令行参数 */
declare const __args: string[];

/** 当前环境变量 */
declare const __env: Record<string, string>;

/** 最近一次执行命令输出的内容 */
declare const __output: string;

/** 最近一次执行命令输出内容的字节数 */
declare const __outputbytes: number;

/** 最近一次执行命令进程退出code */
declare const __code: number;


/**
 * 设置全局变量
 * @param name 变量名
 * @param value 值
 * @return 是否成功
 */
declare function set(name: string, value: any): boolean;

/**
 * 获取全局变量
 * @param name 变量名
 * @return 值
 */
declare function get(name: string): any;

/**
 * 格式化文本内容
 * @param format 模板，支持%s等格式
 * @param args 参数列表
 * @return 格式化后的文本内容
 */
declare function format(format: any, ...args: any[]): string;

/**
 * 输出到控制台
 * @param format 模板，支持%s等格式
 * @param args 参数列表
 * @return 是否成功
 */
declare function print(format: any, ...args: any[]): boolean;

/**
 * 输出一行到控制台
 * @param format 模板，支持%s等格式
 * @param args 参数列表
 * @return 是否成功
 */
declare function println(format: any, ...args: any[]): boolean;


/**
 * 睡眠
 * @param milliseconds 毫秒
 * @return 毫秒
 */
declare function sleep(milliseconds: number): number;

/**
 * 退出进程
 * @param code 进程退出code
 */
declare function exit(code?: number): void;

/**
 * 加载配置文件，支持*.json,*.yaml,*.toml格式
 * @param file 文件名
 * @param format 格式，如果没有指定则自动根据文件后缀名判断
 * @return 配置内容
 */
declare function loadconfig(file: string, format?: "json" | "yaml" | "toml"): any;

/** Shell相关操作模块 */
declare const sh: ShModule

/** 文件相关操作模块 */
declare const fs: FsModule;

/** 文件路径相关操作模块 */
declare const path: PathModule;

/** 命令行参数相关操作模块 */
declare const cli: CliModule;

/** HTTP相关操作模块 */
declare const http: HttpModule;

/** 日志相关操作模块 */
declare const log: LogModule;

/** SSH相关操作模块 */
declare const ssh: SshModule;

/** Socket相关操作模块 */
declare const socket: SocketModule;

interface FsModule {
    /**
     * 读取目录
     * @param path 路径
     * @return 文件信息列表
     */
    readdir(path: string): FileStat[];

    /**
     * 读取文件内容
     * @param path 路径
     * @return 文件内容
     */
    readfile(path: string): string;

    /**
     * 读取文件信息
     * @param path 路径
     * @return 文件信息
     */
    stat(path: string): FileStat;

    /**
     * 写入文件
     * @param path 路径
     * @param data 内容
     * @return 是否成功
     */
    writefile(path: string, data: string): boolean;

    /**
     * 追加内容到文件末尾
     * @param path 路径
     * @param data 内容
     * @return 是否成功
     */
    appendfile(path: string, data: string): boolean;
}

interface FileStat {
    /** 文件名 */
    name: string;
    /** 是否为目录 */
    isdir: boolean;
    /** 文件mode，如0644 */
    mode: number;
    /** 文件最后修改秒时间戳 */
    modtime: number;
    /** 文件大小 */
    size: number;
}

interface PathModule {
    /**
     * 拼接文件路径
     * @param args 子路径列表
     * @return 拼接后的路径
     */
    join(...args: string[]): string;

    /**
     * 获取绝对路径
     * @param path 原始路径
     * @return 绝对路径
     */
    abs(path: string): string;

    /**
     * 获取文件名
     * @param path 路径
     * @return 文件名
     */
    base(path: string): string;

    /**
     * 获取文件扩展名
     * @param path 路径
     * @return 文件扩展名
     */
    ext(path: string): string;

    /**
     * 获取路径的上级目录
     * @param path 路径
     * @return 上级目录
     */
    dir(path: string): string;
}

interface CliModule {
    /**
     * 获取指定名称的参数
     * @param flag 参数名称
     * @return 参数值
     */
    get(flag: string): string;

    /**
     * 获取指定索引的参数
     * @param index 参数索引
     * @return 参数值
     */
    get(index: number): string;

    /**
     * 获取指定名称的参数的布尔值，f,false,0表示假，其余为真
     * @param flag 参数名称
     * @return 参数值
     */
    bool(flag: string): boolean;

    /**
     * 获取args参数列表
     * @return 参数列表
     */
    args(): string[];

    /**
     * 获取opts参数
     * @return 参数Map
     */
    opts(): Record<string, string>;

    /**
     * 等待用户输入一行，按Enter确认
     * @param message 提示
     * @return 输入的内容
     */
    prompt(message?: string): string;
}

interface HttpModule {
    /**
     * 设置HTTP请求的超时时间
     * @param milliseconds 毫秒
     * @return 毫秒
     */
    timeout(milliseconds: number): number;

    /**
     * 发送HTTP请求
     * @param method 请求方法
     * @param url 请求URL
     * @param headers 请求头
     * @param body 请求体
     * @return 响应结果
     */
    request(method: string, url: String, headers?: Record<string, string>, body?: string): HttpResponse;

    /**
     * 通过HTTP下载文件
     * @param url 文件地址
     * @param filename 目标文件名，如果未指定则创建临时文件
     * @return 存储的文件名
     */
    download(url: string, filename?: string): string;
}

interface HttpResponse {
    /** 状态码 */
    status: number;
    /** 响应头 */
    headers: Record<string, string | string[]>;
    /** 响应体 */
    body: string;
}

interface LogModule {
    /**
     * 日志输出到控制台
     * @param format 模板，支持%s等格式
     * @param args 参数列表
     * @return 是否成功
     */
    info(format: any, ...args: any[]): boolean;

    /**
     * 日志输出到控制台
     * @param format 模板，支持%s等格式
     * @param args 参数列表
     * @return 是否成功
     */
    error(format: any, ...args: any[]): boolean;
}

interface ShModule {
    /**
     * 设置环境变量
     * @param name 环境变量名称
     * @param value 环境变量值
     * @return 是否成功
     */
    setenv(name: string, value: string): boolean;

    /**
     * 执行命令
     * @param cmd 命令
     * @param env 额外的环境变量
     * @param combineOutput 是否合并输出，当为true时不直接输出命令执行结果，而存储到__output变量中
     * @return 进程信息
     */
    exec(cmd: string, env?: Record<string, string>, combineOutput?: boolean): ExecResult;

    /**
     * 后台执行命令
     * @param cmd 命令
     * @param env 额外的环境变量
     * @param combineOutput 是否合并输出，当为true时不直接输出命令执行结果，而存储到__output变量中
     * @return 进程信息
     */
    bgexec(cmd: string, env?: Record<string, string>, combineOutput?: boolean): ExecResult;

    /**
     * 改变当前工作目录
     * @param dir 目录路径
     * @return 是否成功
     */
    chdir(dir: string): boolean;

    /**
     * 改变当前工作目录
     * @param dir 目录路径
     * @return 是否成功
     */
    cd(dir: string): boolean;

    /**
     * 获取当前工作目录
     * @return 当前工作目录路径
     */
    cwd(): string;

    /**
     * 获取当前工作目录
     * @return 当前工作目录路径
     */
    pwd(): string;
}

interface ExecResult {
    /**
     * 进程PID
     */
    pid: number;
    /**
     * 进程退出code
     */
    code?: number;
    /**
     * 进程输出内容，仅当combineOutput=true时有效
     */
    output?: string;
    /**
     * 进出输出内容字节数，仅当combineOutput=true时有效
     */
    outputbytes?: number;
}

interface SshModule {
    /**
     * 设置SSH配置
     * @param name 配置名
     * @param value 配置值
     * @return 是否成功
     */
    set(name: "user" | "password" | "key" | "keypass" | "auth" | "timeout" | "port", value: any): boolean;

    /**
     * 连接到指定服务器
     * @param host 服务器地址
     * @return 是否成功
     */
    open(host: string): boolean;

    /**
     * 关闭服务器连接
     * @return 是否成功
     */
    close(): boolean;

    /**
     * 设置环境变量
     * @param name 环境变量名称
     * @param value 环境变量值
     * @return 是否成功
     */
    setenv(name: string, value: string): boolean;

    /**
     * 执行命令
     * @param cmd 命令
     * @param env 额外的环境变量
     * @param combineOutput 是否合并输出，当为true时不直接输出命令执行结果，而存储到__output变量中
     * @return 进程信息
     */
    exec(cmd: string, env?: Record<string, string>, combineOutput?: boolean): SshExecResult;
}

interface SshExecResult {
    /**
     * 进程退出code
     */
    code?: number;
    /**
     * 进程输出内容，仅当combineOutput=true时有效
     */
    output?: string;
    /**
     * 进出输出内容字节数，仅当combineOutput=true时有效
     */
    outputbytes?: number;
}

interface SocketModule {
    /**
     * 设置超时时间
     * @param milliseconds 毫秒
     * @return 毫秒
     */
    timeout(milliseconds: number): number;

    /**
     * TCP发送消息
     * @param host 地址
     * @param port 端口
     * @param data 数据
     * @return 服务器返回的内容
     */
    tcpsend(host: string, port: number, data: string): string;

    /**
     * TCP端口连接测试
     * @param host 地址
     * @param port 端口
     * @return 是否成功
     */
    tcptest(host: string, port: number): boolean;
}