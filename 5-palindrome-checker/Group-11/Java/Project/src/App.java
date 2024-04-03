
//import javafx.application.Application;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.util.List;

import javafx.application.Application;

import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.stage.FileChooser;
import javafx.stage.Stage;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.ProgressBar;
import javafx.scene.control.TextArea;
import javafx.scene.control.TextField;
import javafx.scene.effect.DropShadow;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.scene.text.Font;
import javafx.scene.text.Text;
import javafx.scene.paint.Color;

public class App extends Application {
    // public void createBottomPane(BorderPane border) {
    // HBox hbox3 = new HBox();
    // ProgressBar pb = new ProgressBar(0.1);
    // Label lab = new Label("Word Count: ");
    // Label countNum = new Label("0");
    // Label status = new Label("Progress");
    // countNum.setMaxHeight(4);
    // countNum.setMaxWidth(10);
    // hbox3.setSpacing(10);
    // hbox3.setAlignment(Pos.CENTER);
    // hbox3.getChildren().addAll(lab, countNum, status, pb);

    // border.setBottom(hbox3);
    // }

    public void createTitle(BorderPane borderPane) {
        HBox hbox = new HBox();
        Text t = new Text();
        t.setText("PALINDROME CHECKER");
        // t.yProperty().bind(borderPane.widthProperty().divide(2));
        DropShadow ds = new DropShadow();
        ds.setOffsetY(3.0f);
        ds.setColor(Color.color(0.4f, 0.4f, 0.4f));
        t.setStyle(
                "-fx-font: 48px Tahoma;-fx-fill: linear-gradient(from 0%  0% to 100% 200%,repeat, aqua 0%, green  50%);-fx-stroke:blue;-fx-stroke-width:1.5;");
        t.setEffect(ds);
        hbox.setStyle(
                "-fx-background-color:linear-gradient(from 0%  0% to 100% 200%,repeat, #90e0ef 0%, #caf0f8  50%)");
        hbox.getChildren().add(t);
        hbox.setAlignment(Pos.CENTER);
        borderPane.setTop(hbox);

        borderPane.setAlignment(hbox, Pos.CENTER);
    }

    public void createLeftPane(BorderPane border, Stage prStage) {
        HBox hbox3 = new HBox();
        ProgressBar pb = new ProgressBar(0.1);
        pb.idProperty().set("pr-bar");
        Label lab = new Label("Word Count: ");
        Label countNum = new Label("0");
        countNum.setStyle("-fx-font-weight:bold;");
        countNum.idProperty().set("numCount");
        Label status = new Label("Progress");
        // countNum.setMaxHeight(4);
        // countNum.setMaxWidth(10);
        hbox3.setSpacing(10);
        hbox3.setAlignment(Pos.CENTER);
        Label palCount = new Label("Palindromes Found: ");
        Label palNum = new Label("0");
        palNum.setStyle("-fx-font-weight:bold");
        palNum.idProperty().set("pal_num");
        hbox3.getChildren().addAll(lab, countNum, status, pb, palCount, palNum);
        hbox3.setMinHeight(30);

        border.setBottom(hbox3);

        Button btn = new Button("Choose A file");
        btn.setStyle("-fx-text-fill:white;-fx-background-color:slateblue");
        VBox vbx = new VBox();
        vbx.getChildren().add(btn);
        vbx.setAlignment(Pos.CENTER);

        vbx.setStyle("-fx-background-color:#caf0f8;-fx-padding:5");
        ;
        btn.setOnAction(event -> {
            pb.setProgress(0);
            FileChooser fileChooser = new FileChooser();
            fileChooser.setTitle("Open Resource File");

            File file = fileChooser.showOpenDialog(prStage);

            // System.out.println(file.toPath());

            try {
                PrintWriter outfile = new PrintWriter(file.getAbsolutePath() + "output.txt");

                List<String> lines = Files.readAllLines(file.toPath());
                int siz = lines.size();
                int numOfwords = 0;
                ProgressBar pr = (ProgressBar) border.lookup("#pr-bar");
                Label lb = (Label) border.lookup("#numCount");
                Label paLabel = (Label) border.lookup("#pal_num");
                int pals = 0;
                for (String line : lines) {
                    numOfwords++;
                    lb.setText(Integer.toString(siz));
                    pr.setProgress(numOfwords / (siz));

                    if (Palindrome.isPalindrome(line)) {
                        pals++;
                        paLabel.setText(Integer.toString(pals));
                        outfile.println(line);
                    }
                }
                outfile.close();
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }

        });
        ;
        border.setLeft(vbx);
    }

    public void createContent(BorderPane border) {
        HBox hbox = new HBox();
        hbox.setPadding(new Insets(15, 12, 15, 12));
        hbox.setSpacing(10);

        Label label1 = new Label("Word:");
        label1.setStyle("-fx-font: 18px Tahoma");
        TextField textField = new TextField();
        Button checkBtn = new Button("Check");
        checkBtn.setMinWidth(130);
        checkBtn.setStyle("-fx-background-color:slateblue;-fx-text-fill:white;-fx-cursor:hand");

        hbox.getChildren().addAll(label1, textField, checkBtn);

        hbox.setSpacing(30);
        hbox.setAlignment(Pos.CENTER);

        HBox hBox2 = new HBox();
        Label l2 = new Label("Result:");
        l2.setStyle("-fx-font: 18px Tahoma");
        TextArea txt = new TextArea();

        textField.setOnMouseClicked(event -> {
            txt.setText("");
            textField.setText("");
        });
        txt.setEditable(false);
        txt.setMaxWidth(280);
        txt.setMaxHeight(20);
        ;
        txt.setStyle("-fx-font: 30px Courier; -fx-alignment:CENTER");

        checkBtn.setOnAction(event -> {

            boolean ans = Palindrome.isPalindrome(textField.getText());
            if (ans) {
                txt.setText("True");
                txt.setStyle("-fx-font: 30px Courier; -fx-alignment:CENTER;-fx-text-fill:green;");
            } else {
                txt.setText("False");
                txt.setStyle("-fx-font: 30px Courier; -fx-alignment:CENTER;-fx-text-fill:red;");
            }
        });

        hBox2.getChildren().addAll(l2, txt);
        hBox2.setSpacing(30);
        hBox2.setAlignment(Pos.CENTER);
        VBox root = new VBox(hbox, hBox2);

        border.setCenter(root);
        border.setAlignment(root, Pos.CENTER);
        // createBottomPane(border);

        root.setAlignment(Pos.CENTER);
        root.setStyle("-fx-background-color: #00b4d8;-fx-border:3px;");
    }

    @Override // Override the start method in the Application class
    public void start(Stage primaryStage) {
        BorderPane border = new BorderPane();
        createTitle(border);
        createContent(border);
        createLeftPane(border, primaryStage);
        Scene scene = new Scene(border, 600, 600);

        primaryStage.setTitle("PALINDROME CHECKER"); // Set the stage title
        primaryStage.setScene(scene); // Place the scene in the stage
        primaryStage.show(); // Display the stage
    }

    /**
     * The main method is only needed for the IDE with limited
     * JavaFX support. Not needed for running from the command line.
     */
    public static void main(String[] args) {
        launch(args);
    }
}
