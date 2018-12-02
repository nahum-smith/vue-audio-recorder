export default {
  props: {
    blobHandler      : { type: Function                      },
    failedUpload     : { type: Function                      },
    filename         : { type: String, default: 'record.wav' },
    headers          : { type: Object                        },
    startUpload      : { type: Function                      },
    successfulUpload : { type: Function                      },
    uploadUrl        : { type: String                        }
  }
}
