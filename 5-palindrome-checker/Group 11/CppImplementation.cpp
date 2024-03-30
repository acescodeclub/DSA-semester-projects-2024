#include <iostream>
#include <fstream>
using namespace std;
//template <typename Type>
//improvement we will use generics to make it be able to take all data types
template <typename Type> class Node{
    public:
    Type dat;
    Node<Type> *next;
    Node(Type info):dat(info),next(nullptr){};
};
template <typename Type>class Stack{
    Node<Type> *root;
    public:
    Stack():root(nullptr){}
    void push(Type inpt)
    {
        if(root==nullptr)
            root=new Node<Type>(inpt);
        else{
            Node <Type>*newRoot=new Node<Type>(inpt);
            newRoot->next=root;
            root=newRoot;
        }

    }
    Type pop(){
        if(root==nullptr)    {
             return nullptr;

        }
        else{
            Type ans=root->dat;
            root=root->next;
            return ans;
        }

    }
};
int main(int argc,char *argv[])
{
    cout<<"bingo"<<endl;
    Stack<string> nsst=Stack<string>();
     string fn = argv[1]; //filename
               cout << fn<<endl;;
               std::fstream f;
               f.open(fn);
               //your logic here
               string let;
               while(getline(f,let))
               {
                   cout<<let<<endl;
               }
               f.close();
    /*nsst.push("logan");
    nsst.push("green");
    nsst.push("is");
    cout<<nsst.pop()<<endl;
    cout<<nsst.pop()<<endl;
    cout<<nsst.pop()<<endl;
    cout<<nsst.pop()<<endl;
    */
    return 0;
}
