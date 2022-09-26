import React, { Component } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import { get } from "lodash";

const useStyles = {
  dialogTextStyle: {
    textAlign: "center"
  }
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenshot: null,
      name: "Animesh",
      open: false,
      isProcess: false,
      tab: 0
    };
    this.onAnalyzeFace = this.onAnalyzeFace.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
  }

  handleClick = () => {
    const screenshot = this.webcam.getScreenshot();
    this.setState({ screenshot });
  };

  handleDialogClose = () => {
    this.setState({ open: false });
  };

  b64toBlob = (b64DataStr, contentType = "", sliceSize = 512) => {
    const byteCharacters = atob(b64DataStr);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  };

  async onAnalyzeFace() {
    this.setState({ open: true, isProcess: true });
    const faceData = await this.detectFace();
    const identifiedCandidates = await this.identifyFaceInPersonGroup(faceData);
    const personData = await this.getPersonData(
      get(identifiedCandidates, "[0].candidates[0].personId")
    );
    this.setState({ isProcess: false, name: get(personData, "name") });
  }

  async detectFace() {
    try {
      const screenshot = this.webcam.getScreenshot();
      this.setState({ screenshot });
      const s = screenshot.split(",");
      const blob = this.b64toBlob(s[1]);
      const config = {
        headers: {
          "Content-Type": "application/octet-stream",
          "Ocp-Apim-Subscription-Key": "d7d3e43638ff44e98d5eb7e73b366dea"
        }
      };

      const response = await axios.post(
        `http://https://azure2021.cognitiveservices.azure.com/face/v1.0/detect?overload=stream&returnFaceId=true&returnFaceLandmarks=false&recognitionModel=recognition_02&returnRecgnitionModel=true`,
        blob,
        config
      );
      console.log("detectFace", response);
      return response.data;
    } catch (error) {
      console.log("detectFace", error);
    }
  }

  async identifyFaceInPersonGroup(data) {
    try {
      const payload = {
        confidenceThreshold: 0.5,
        faceIds: [data[0].faceId],
        personGroupId: "my_friends",
        maxNumOfCandidatesReturned: 1
      };
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Ocp-Apim-Subscription-Key": "d7d3e43638ff44e98d5eb7e73b366dea"
        }
      };
      const response = await axios.post(
        "http://https://azure2021.cognitiveservices.azure.com/face/v1.0/identify",
        payload,
        config
      );
      console.log("identifyFaceInPersonGroup", response);
      return response.data;
    } catch (error) {
      console.log("identifyFaceInPersonGroup", error);
    }
  }

  async getPersonData(personId, personGroupId = "my_friends") {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Ocp-Apim-Subscription-Key": "d7d3e43638ff44e98d5eb7e73b366dea"
        }
      };
      const response = await axios.get(
        `http://https://azure2021.cognitiveservices.azure.com/face/v1.0/persongroups/${personGroupId}/persons/${personId}`,
        config
      );
      console.log("getPersonData", response);
      return response.data;
    } catch (error) {
      console.log("getPersonData", error);
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div>
          <Button
            onClick={this.onAnalyzeFace}
            variant="outlined"
            color="primary"
          >
            Analyze face
          </Button>
        </div>
        <br/>
        <Webcam
          screenshotFormat="image/jpeg"
          audio={false}
          ref={(webcam) => (this.webcam = webcam)}
          style={{
              zindex: 8,
              right:0,
              height: "80%",
              width: "60%",
              objectFit: "fill",
            }}
        />
        {/* <div>
          <h2>Screenshots</h2>
          <div className="screenshots">
            {this.state.screenshot ? (
              <img src={this.state.screenshot} alt="" />
            ) : null}
          </div>
        </div> */}

        <div>
          <Dialog
            open={this.state.open}
            onClose={this.handleDialogClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Welcome to AZURE Port"}
            </DialogTitle>
            <DialogContent className={classes.dialogTextStyle}>
              {this.state.isProcess ? (
                <CircularProgress />
              ) : (
                <DialogContentText id="alert-dialog-description">
                  Hi {this.state.name}
                </DialogContentText>
              )}
            </DialogContent>
            {!this.state.isProcess && (
              <DialogActions>
                <Button onClick={this.handleDialogClose} color="primary">
                  Not {this.state.name}?
                </Button>
              </DialogActions>
            )}
          </Dialog>
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(App);
