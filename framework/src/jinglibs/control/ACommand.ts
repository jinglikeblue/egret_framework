/**
 * 抽象命令工具
 */
abstract class ACommand {
	public constructor() {
		/**
		 * 命令接收的参数通过构造函数传入，子类各自实现
		 */
	}

	/**
	 * 执行命令
	 */
	abstract run():void;
}