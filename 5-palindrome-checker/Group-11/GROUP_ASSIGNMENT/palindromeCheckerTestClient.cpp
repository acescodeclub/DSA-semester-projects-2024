#include <iostream>
template <Type>
{
    return type;
} ;
using namespace std;
class Node<Type>{
    public:
Node *next;
string dat;
Node(string data):dat(data),next(nullptr){}

};
class Stack{
    Node * root;
public:
    Stack():root(nullptr){};
    void push(string dat)
    {
        if(root==nullptr)
            root=new Node(dat);
        else{
            Node *newNode=new Node(dat);
            newNode->next=root;
            root=newNode;
        }
    }
      bool isEmpty()
      {
          return root==nullptr;
      }
    string pop(){
    string res;
    Node *tmp  =root;
    if(tmp!=nullptr)
    {
        res=root->dat;
        root=root->next;
        tmp->next=nullptr;
        delete tmp;
    return res; }
   // else{
    //    throw std::exception();
  //  }

    }
    //we may even overload the == operator to compare 2 stacks
    bool operator ==(Stack stk2)
    {
        while(true)
        {
            if(stk2.pop()!=this->pop())
                return false;
            if(stk2.isEmpty() && this->isEmpty())
                return true;
            }
    }

};
int main()
{
    Stack inputStack=Stack();
    Stack temporaryStack=Stack();
    Stack outputStack=Stack();
    string intake;
    while(cin>>intake)
    {
        inputStack.push(intake);
        temporaryStack.push(intake);
    } ;
    while(!temporaryStack.isEmpty())
    {
        outputStack.push(temporaryStack.pop());
    }

    if(outputStack==inputStack)
    {
        cout<<"Word is a palindrome "<<endl;
    }

    return 0          ;
}
