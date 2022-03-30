const {
  ConsoleLogger,
  DownloadEvent,
  DownloadStatus,
  DownloadTask,
  DownloadTaskGroup,
  FileDescriptor,
  Logger,
  requestMethodHeadFileInformationDescriptor,
  CommonUtils
} = require('node-parallel-downloader');
const crypto = require('crypto');

// 设置不禁用log
Logger.setDisabled(false);
// 设置Logger的代理类
Logger.setProxy(new ConsoleLogger());

/**
* 正常下载流程
*/
async function example() {
  // Logger.printStackTrace();
  const taskGroup = await new DownloadTaskGroup()
        // 配置文件保存的位置
      .configConfigDir('./temp_info')
    //   每个下载任务最大的分割数量
      .configMaxWorkerCount(5)
    //   下载进度通知频率 /ms
      .configProgressTicktockMillis(500)
    //   下载任务的 taskId 的生成方式，taskId 要求: 针对同一个下载任务 taskId 唯一
      .configTaskIdGenerator(async (downloadUrl, storageDir, filename) => {
          return crypto.createHash('md5').update(downloadUrl).digest('hex');
      })
    //   指定文件尺寸，文件 content-type 的获取方式
      .configFileInfoDescriptor(requestMethodHeadFileInformationDescriptor)
      .configHttpRequestOptionsBuilder((requestOptions, taskId, index, from, to, progress) => {
          return requestOptions;
      })
      .configRetryTimes(10000)
      .configHttpTimeout(30000)
      .loadFromConfigDir();
    
    //   此处会返回 downloadTask 对象
    // 如果该任务下载了一半，则返回的是下载了一半的 downloadTask 对象
  const task = await taskGroup.newTask(
      'https://a24.gdl.netease.com/Terminal.7z',
      'temp_repo',
      'Terminal.7z'
  );

//   初始化
  task.on(DownloadEvent.INITIALIZED, (descriptor) => {
      Logger.debug('+++DownloadEvent.INITIALIZED:', task.getStatus(), '任务创建直到完成, 只会调用一次');
  })
//   开始事件
  .on(DownloadEvent.STARTED, (descriptor) => {
      Logger.debug('+++DownloadEvent.STARTED:', task.getStatus());
  })
//   下载中
  .on(DownloadEvent.DOWNLOADING, (descriptor) => {
      Logger.debug('+++DownloadEvent.DOWNLOADING:', task.getStatus());
  })
//   停止
  .on(DownloadEvent.STOPPED, (descriptor) => {
      Logger.debug('+++DownloadEvent.STOPPED:', task.getStatus());
  })
//   下载进度
  .on(DownloadEvent.PROGRESS, (descriptor, progress) => {
      const ticktock = progress.ticktock;
      const beautified = CommonUtils.beautifyProgress(progress, ticktock);
      const chunks = [];
      progress.chunks.forEach((chunkProgress) => {
          const beautifiedChunk = CommonUtils.beautifyProgress(chunkProgress, ticktock);
          beautifiedChunk.noResp = chunkProgress.noResp;
          beautifiedChunk.retry = chunkProgress.retry;
          chunks.push(beautifiedChunk);
      });
      beautified.chunks = chunks;
      Logger.debug('+++DownloadEvent.PROGRESS:', JSON.stringify(beautified));
  })
//   将要合并事件
  .on(DownloadEvent.MERGE, (descriptor) => {
      Logger.debug('+++DownloadEvent.MERGE:', descriptor, task.getStatus());
  })
//   下载完成事件
  .on(DownloadEvent.FINISHED, (descriptor) => {
      Logger.debug('+++DownloadEvent.FINISHED:', descriptor, task.getStatus());
  })
//   下载错误事件
  .on(DownloadEvent.ERROR, (descriptor, errorMessage) => {
      Logger.error('+++DownloadEvent.ERROR:', descriptor, errorMessage, task.getStatus());
  })
//   下载取消事件
  .on(DownloadEvent.CANCELED, (descriptor) => {
      Logger.warn('+++DownloadEvent.CANCELED:', descriptor, task.getStatus());
  });

//   开始任务&继续下载
  const started = await task.start();

//   暂停任务
// const stoped = await task.stop()

// 取消任务
// const canceled = await task.cancel()

// 获取当前任务状态
// task.getStatus()

// 获取任务 taskId
// task.getTaskId()

// 获取任务信息，不要尝试修改返回对象内的数据
// task.getDescriptor()
  
  Logger.assert(started);
  
  return task;
}

example();