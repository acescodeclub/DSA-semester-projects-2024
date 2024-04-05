import java.io.IOException;

public class Palindrome {

    public static boolean isPalindrome(String dat) {
        dat = dat.toLowerCase();
        if (dat.length() == 0 || dat == "") {
            return false;
        }
        LinkedStack<Character> entryStack = new LinkedStack<Character>();
        LinkedStack<Character> temporaryStack = new LinkedStack<Character>();
        for (int i = 0; i < dat.length(); i++) {
            entryStack.push(dat.charAt(i));
            temporaryStack.push(dat.charAt(i));
        }
        LinkedStack<Character> outputStack = new LinkedStack<Character>();
        for (int i = 0; i < dat.length(); i++) {
            outputStack.push(temporaryStack.pop());
        }
        if (entryStack.compareTo(outputStack) == 1) {
            return true;
        } else {
            return false;
        }
    }

    public static void main(String[] args) throws IOException {
        char inpt;
        LinkedStack<Character> entryStack = new LinkedStack<Character>();
        LinkedStack<Character> temporaryStack = new LinkedStack<Character>();
        while ((inpt = (char) System.in.read()) != '\r') {
            // System.out.println((inpt));
            entryStack.push(inpt);
            temporaryStack.push(inpt);

        }
        LinkedStack<Character> outputStack = new LinkedStack<Character>();
        while (!temporaryStack.isEmpty()) {
            outputStack.push(temporaryStack.pop());
        }
        System.out.println(entryStack.compareTo(outputStack));

    }
}
