import React, { useState } from "react";
import { Row, Col, Badge } from "antd";
import { useReactMediaRecorder } from "react-media-recorder";
import Text from "antd/lib/typography/Text";
import "./screenRecordingStyle.css";

const ScreenRecording = ({
  screen,
  audio,
  video,
  downloadRecordingPath,
  downloadRecordingType,
  emailToSupport,
}) => {
  const [recordingNumber, setRecordingNumber] = useState(0);
  const RecordView = () => {
    const {
      status,
      startRecording: startRecord,
      stopRecording: stopRecord,
      mediaBlobUrl,
    } = useReactMediaRecorder({ screen, audio, video });
    const startRecording = () => {
      return startRecord();
    };
    const stopRecording = () => {
      const currentTimeSatmp = new Date().getTime();
      setRecordingNumber(currentTimeSatmp);
      return stopRecord();
    };
    const viewRecording = () => {
      window.open(mediaBlobUrl, "_blank").focus();
    };
    const downloadRecording = () => {
      const pathName = `${downloadRecordingPath}_${recordingNumber}.${downloadRecordingType}`;
      try {
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          // for IE
          window.navigator.msSaveOrOpenBlob(mediaBlobUrl, pathName);
        } else {
          // for Chrome
          const link = document.createElement("a");
          link.href = mediaBlobUrl;
          link.download = pathName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      } catch (err) {
        console.error(err);
      }
    };
    const mailRecording = () => {
      try {
        window.location.href = `mailTo:${emailToSupport}?subject=Screen recording for an Issue number ${recordingNumber}&body=Hello%20Team,%0D%0A%0D%0A${mediaBlobUrl}`;
      } catch (err) {
        console.error(err);
      }
    };
    return (
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'-40px', marginBottom:'-10px'}}>
        <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
        <div>
        <img src="https://i.pinimg.com/originals/c8/23/69/c823695ab9d430a817461a62ae993b9f.png" width='110' height='90'/>
        </div>
        <div>
          {status && status !== "stopped" && (
            <Text>
              Screen Recording Status: {status && status.toUpperCase()}
            </Text>
          )}
          {status && status === "recording" && (
            <Badge
              className="screen-recording-badge"
              color="#faad14"
              status="processing"
              offset={[2, 0]}
              style={{
                marginLeft: "5px",
              }}
            />
          )}
        </div>
        </div>
        <div>
        {status && status !== "recording" && (
            <button
              size="small"
              onClick={startRecording}
              type="primary"
              icon="play-circle"
              className="margin-left-sm btn"
            >
              {mediaBlobUrl ? "Record again" : "Record lecture"}
            </button>
          )}
          {status && status === "recording" && (
            <button
              size="small"
              onClick={stopRecording}
              type="danger"
              icon="stop"
              className="margin-left-sm btn"
            >
              Stop Recording
            </button>
          )}
          {mediaBlobUrl && status && status === "stopped" && (
            <button
              size="small"
              onClick={viewRecording}
              type="primary"
              icon="picture"
              className="viewRecording margin-left-sm btn"
            >
              View
            </button>
          )}
          {downloadRecordingType &&
            mediaBlobUrl &&
            status &&
            status === "stopped" && (
              <button
                size="small"
                onClick={downloadRecording}
                type="primary"
                icon="download"
                className="downloadRecording margin-left-sm btn"
              >
                Download
              </button>
            )}
          {emailToSupport && mediaBlobUrl && status && status === "stopped" && (
            <button
              size="small"
              onClick={mailRecording}
              type="primary"
              icon="mail"
              className="mailRecording margin-left-sm btn"
            >
              Email To Support
            </button>
          )}
        </div>
      </div>
    );
  };
  return (
    <div className="Scren-Record-Wrapper" style={{ padding: "5px 20px" }}>
      {RecordView()}
    </div>
  );
};
export default ScreenRecording;
