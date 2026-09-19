package com.prem.khajana.controller;
import com.prem.khajana.model.VocabularyWord;
import com.prem.khajana.service.KhajanaService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@Controller
public class KhajanaController {
 private final KhajanaService service;
 public KhajanaController(KhajanaService service){this.service=service;}

 @GetMapping("/")
 public String home(@RequestParam(defaultValue="")String q,@RequestParam(defaultValue="")String type,@RequestParam(defaultValue="1")int page,@RequestParam(defaultValue="12")int size,@RequestParam(required=false)Integer wordId,Model model){
  size=Math.max(1,Math.min(size,100)); page=Math.max(1,page); List<VocabularyWord> filtered=service.search(q,type);
  int totalPages=Math.max(1,(filtered.size()+size-1)/size); page=Math.min(page,totalPages);
  int from=Math.min((page-1)*size,filtered.size()),to=Math.min(from+size,filtered.size());
  model.addAttribute("words",filtered.subList(from,to)); model.addAttribute("allCount",service.all().size()); model.addAttribute("resultCount",filtered.size());
  model.addAttribute("types",service.types()); model.addAttribute("q",q); model.addAttribute("selectedType",type); model.addAttribute("page",page); model.addAttribute("size",size); model.addAttribute("totalPages",totalPages);
  model.addAttribute("selected",wordId==null?null:service.findById(wordId).orElse(null)); model.addAttribute("wordOfDay",service.wordOfDay()); return "index";
 }
 @GetMapping("/api/word/{id}") @ResponseBody public VocabularyWord word(@PathVariable int id){return service.findById(id).orElseThrow();}
 @GetMapping("/api/word-of-day") @ResponseBody public VocabularyWord wordOfDay(){return service.wordOfDay();}
 @GetMapping("/api/random") @ResponseBody public VocabularyWord random(){return service.randomWord();}
 @GetMapping("/api/quiz") @ResponseBody public List<Map<String,Object>> quiz(@RequestParam(defaultValue="10")int count){
  int n=Math.max(1,Math.min(count,20)); return service.quizWords(n).stream().map(w->Map.of("id",w.getId(),"word",w.getWord(),"type",w.getType(),"meaning",w.getMeanings().isEmpty()?"":w.getMeanings().get(0),"options",service.quizOptions(w))).toList();
 }
}