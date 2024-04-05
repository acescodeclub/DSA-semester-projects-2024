/**
 * JavaImplementation
 */
public class JavaImplementation<Type> implements Comparable<Type> {

    public class Node<Type> {
        public Type data;
        public Node<Type> next;

        Node(Type dat) {
            data = dat;
            next = null;
        }
    }

    public Node<Type> root;

    JavaImplementation() {
        root = null;
    }

    boolean isEmpty() {
        return root == null;
    }

    void push(Type dat) {
        if (isEmpty())
            root = new Node<Type>(dat);
        else {
            Node<Type> newNode = new Node<Type>(dat);
            newNode.next = root;
            root = newNode;
        }
    }

    Type pop() throws Exception {
        if (root == null)
            throw new Exception("Stack is Empty");
        else {
            Type ans = root.data;
            root = root.next;
            return ans;
        }
    }

    @Override
    public int compareTo() {

        return -1;
    }

    /*
     * public static void main(String[] args) {
     * JavaImplementation<String> inputStack;
     * 
     * }
     */

    @Override
    public int compareTo(Object o) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'compareTo'");
    }
}