public class ClassicPalindrome {
    public class ListNode {
        int data;
        ListNode next;

        ListNode(int x) {
            this.data = x;
            next = null;
        }
    }

    /**
     * 2.7 Implement a function to check if a linked list is a palindrome.
     * 
     * Solution:
     * find the middle of the list. Instead of creating a stack, use recursion
     * to solve it. We will need a wrapper class though. Pass the head of the
     * list in the function. When we meet the last node in the list in the
     * recursion, compare it with the head. If they are the same, return
     * Wrapper(true, head.next). Otherwise, return Wrapper(false, head.next)....
     * more details please refer to the code.
     * 
     * @Runtime & spaces
     *          runtime: O(n)
     *          space: O(n)
     *          use recursion, we can avoid using additional data structure,
     *          however,
     *          we still use the system stack. That's using space O(N) too.
     */
    // inner class for the recursive method
    private class Result {
        boolean isSame;
        ListNode node;

        public Result(boolean isSame, ListNode node) {
            this.isSame = isSame;
            this.node = node;
        }
    }

    public static void main(String[] args) {
        // TODO Auto-generated method stub
        ClassicPalindrome so = new ClassicPalindrome();
        ListNode a = so.new ListNode(1);
        ListNode b = so.new ListNode(1);
        // ListNode c = new ListNode(3);
        // ListNode d = new ListNode(4);
        // ListNode e = new ListNode(5);
        // ListNode f = new ListNode(2);
        // ListNode g = new ListNode(1);
        a.next = b;
        // b.next = c;
        // c.next = d;
        // d.next = e;
        // e.next = f;
        // f.next = g;
        System.out.println(so.isPalindrome(a));
    }

    private boolean isPalindrome(ListNode head) {
        // TODO Auto-generated method stub
        if (head == null)
            return false;
        if (head.next == null)
            return true;
        ListNode fast = head;
        ListNode slow = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        Result rs = isPalindromeRecursive(head, slow);
        if (!rs.isSame)
            return false;
        return true;
    }

    private Result isPalindromeRecursive(ListNode head, ListNode slow) {
        // TODO Auto-generated method stub
        if (slow.next == null) {
            return new Result(head.data == slow.data, head.next);
        }
        Result rs = isPalindromeRecursive(head, slow.next);
        if (!rs.isSame)
            return rs;
        if (rs.node.data == slow.data)
            rs.node = rs.node.next;
        else
            rs.isSame = false;
        return rs;
    }
}
