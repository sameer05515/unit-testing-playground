package com.prem.khajana.service;
import com.prem.khajana.model.VocabularyWord;
import jakarta.annotation.PostConstruct;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.w3c.dom.*;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.InputStream;
import java.util.*;

@Service
public class KhajanaService {
 private final List<VocabularyWord> words=new ArrayList<>();
 private final Random random=new Random();

 @PostConstruct
 public void load(){
  try(InputStream in=new ClassPathResource("static/data/khajana.xml").getInputStream()){
   DocumentBuilderFactory f=DocumentBuilderFactory.newInstance();
   f.setFeature("http://apache.org/xml/features/disallow-doctype-decl",true);
   f.setFeature("http://xml.org/sax/features/external-general-entities",false);
   f.setFeature("http://xml.org/sax/features/external-parameter-entities",false);
   f.setXIncludeAware(false); f.setExpandEntityReferences(false);
   Document doc=f.newDocumentBuilder().parse(in);
   NodeList nodes=doc.getElementsByTagName("myword");
   for(int i=0;i<nodes.getLength();i++){
    Element item=(Element)nodes.item(i); Node wn=item.getElementsByTagName("word").item(0);
    if(wn==null) continue; String word=wn.getTextContent().trim(); if(word.isBlank()) continue;
    String type=wn.getAttributes().getNamedItem("type")!=null?wn.getAttributes().getNamedItem("type").getNodeValue():"unknown";
    words.add(new VocabularyWord(i,word,type,children(item,"meanings","meaning"),children(item,"examples","example")));
   }
   words.sort(Comparator.comparing(VocabularyWord::getWord,String.CASE_INSENSITIVE_ORDER));
  }catch(Exception e){throw new IllegalStateException("Unable to load khajana.xml",e);}
 }
 private List<String> children(Element p,String container,String child){
  NodeList cs=p.getElementsByTagName(container); if(cs.getLength()==0)return List.of();
  NodeList ns=((Element)cs.item(0)).getElementsByTagName(child); List<String> out=new ArrayList<>();
  for(int i=0;i<ns.getLength();i++){String s=ns.item(i).getTextContent().trim();if(!s.isBlank())out.add(s);}
  return List.copyOf(out);
 }
 public List<VocabularyWord> all(){return List.copyOf(words);}
 public Optional<VocabularyWord> findById(int id){return words.stream().filter(w->w.getId()==id).findFirst();}
 public List<String> types(){return words.stream().map(VocabularyWord::getType).filter(Objects::nonNull).filter(s->!s.isBlank()).distinct().sorted().toList();}
 public List<VocabularyWord> search(String q,String type){
  String query=q==null?"":q.trim().toLowerCase(Locale.ROOT), pos=type==null?"":type.trim().toLowerCase(Locale.ROOT);
  return words.stream().filter(w->{
   boolean text=query.isBlank()||w.getWord().toLowerCase(Locale.ROOT).contains(query)||w.getMeanings().stream().anyMatch(m->m.toLowerCase(Locale.ROOT).contains(query))||w.getExamples().stream().anyMatch(e->e.toLowerCase(Locale.ROOT).contains(query));
   return text&&(pos.isBlank()||w.getType().equalsIgnoreCase(pos));
  }).toList();
 }
 public VocabularyWord randomWord(){return words.get(random.nextInt(words.size()));}
 public VocabularyWord wordOfDay(){long day=Math.floorDiv(System.currentTimeMillis(),86400000L);return words.get((int)(day%words.size()));}
 public List<VocabularyWord> quizWords(int n){List<VocabularyWord> x=new ArrayList<>(words);Collections.shuffle(x);return x.stream().limit(n).toList();}
 public List<String> quizOptions(VocabularyWord correct){
  LinkedHashSet<String> o=new LinkedHashSet<>(); if(!correct.getMeanings().isEmpty())o.add(correct.getMeanings().get(0));
  List<VocabularyWord> x=new ArrayList<>(words);Collections.shuffle(x);
  for(VocabularyWord w:x){if(!w.getMeanings().isEmpty())o.add(w.getMeanings().get(0));if(o.size()>=4)break;}
  return o.stream().limit(4).toList();
 }
}